const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// Auth Endpoints
app.post("/api/auth/login", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // 1. Check local DB using identifier (email or number typed in login)
    const user = await User.findOne({ identifier: username, role });

    if (user) {
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user._id, role: user.role, bcId: user.bcId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      return res.json({
        success: true,
        token,
        user: { username: user.username, role: user.role }, // user.username is now the NAME
      });
    }

    // 2. If not in local DB, check Business Central
    const bcUser = await checkBCUser(username, role);
    if (bcUser) {
      // User exists in BC but not activated locally
      return res
        .status(200)
        .json({
          needs_activation: true,
          message: "Compte trouvé dans Business Central. Veuillez l'activer.",
        });
    }

    return res.status(404).json({ message: "Utilisateur non trouvé" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

app.post("/api/auth/activate", async (req, res) => {
  const { username, password, role } = req.body; // username here is the login ID typed in form

  try {
    // 1. Double check Business Central
    const bcUser = await checkBCUser(username, role);
    if (!bcUser) {
      return res
        .status(404)
        .json({ message: "Utilisateur non trouvé dans Business Central" });
    }

    // 2. Check if already activated
    const existingUser = await User.findOne({ identifier: username, role });
    if (existingUser) {
      return res.status(400).json({ message: "Compte déjà activé" });
    }

    // 3. Create local user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Robust field extraction from BC response (handles Name, name, displayName, etc.)
    const getField = (obj, keys) => {
      for (const key of keys) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
      }
      return null;
    };

    const bcId = getField(bcUser, ['id', 'id_BC', 'number', 'no']) || null;
    const bcName = getField(bcUser, ['displayName', 'DisplayName', 'name', 'Name', 'FullName']) || username;
    const bcEmail = getField(bcUser, ['email', 'Email', 'eMail', 'E-Mail', 'Mail', 'mail']) || null;
    
    const newUser = new User({
      username: bcName, // Store the NAME as requested
      identifier: username, // Store the login ID typed
      password: hashedPassword,
      role,
      bcId: bcId === "N/A" ? null : bcId,
      email: role === "commercial" ? bcEmail : null
    });

    await newUser.save();

    // 4. Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, bcId: newUser.bcId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({
      success: true,
      token,
      user: { username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    console.error("Activation error:", error);
    res.status(500).json({ message: error.code === 11000 ? "Cet email est déjà utilisé pour un compte commercial" : "Erreur lors de l'activation" });
  }
});

async function checkBCUser(username, role) {
  try {
    const token = await getAccessToken();
    const url =
      role === "client"
        ? process.env.BC_API_URL
        : process.env.BC_COMMERCIALES_URL;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const items = response.data.value || [];
    const searchLower = username.toLowerCase();

    if (role === "client") {
      return items.find(
        (c) =>
          (c.number && c.number.toLowerCase() === searchLower) ||
          (c.no && c.no.toLowerCase() === searchLower) ||
          (c.id && c.id.toLowerCase() === searchLower) ||
          (c.displayName && c.displayName.toLowerCase() === searchLower),
      );
    } else {
      return items.find(
        (c) =>
          (c.email && c.email.toLowerCase() === searchLower) ||
          (c.Email && c.Email.toLowerCase() === searchLower) ||
          (c.eMail
             && c.eMail.toLowerCase() === searchLower) ||
          (c.id && c.id.toLowerCase() === searchLower) ||
          (c.code && c.code.toLowerCase() === searchLower) ||
          (c.Code && c.Code.toLowerCase() === searchLower) ||
          (c.name && c.name.toLowerCase() === searchLower) ||
          (c.displayName && c.displayName.toLowerCase() === searchLower),
      );
    }
  } catch (error) {
    console.error("Error checking BC user:", error.message);
    return null;
  }
}

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${process.env.BC_TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.BC_CLIENT_ID);
  params.append("client_secret", process.env.BC_CLIENT_SECRET);
  params.append("scope", process.env.BC_SCOPE);

  try {
    const response = await axios.post(tokenUrl, params);
    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;
    return accessToken;
  } catch (error) {
    console.error(
      "Error fetching BC token:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to fetch access token");
  }
}

/**
 * Fetch clients from Business Central.
 * Maps BC response fields to the structure used by the frontend.
 */
app.get("/api/clients", async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(process.env.BC_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const rawClients = response.data.value || [];
    const mappedClients = rawClients.map((c) => ({
      id: c.number || c.no || c.id || "N/A",
      name: c.displayName || c.name || "Client Inconnu",
      ville: c.city || c.address?.city || "—",
      tel: c.phoneNumber || c.phoneNo || "—",
      credit: c.creditAmount || 0,
      encours: c.balance || 0,
      limit: c.creditLimit || 0,
      remise: c.discountPercentage || 0,
      alerte: c.blocked
        ? "Crédit bloqué"
        : c.balance > c.creditLimit && c.creditLimit > 0
          ? "Limite dépassée"
          : null,
      derniere: c.lastModifiedDateTime
        ? new Date(c.lastModifiedDateTime).toISOString().split("T")[0]
        : "—",
    }));

    res.json(mappedClients);
  } catch (error) {
    console.error(
      "Error fetching BC clients:",
      error.response?.data || error.message,
    );
    res
      .status(500)
      .json({ error: "Failed to fetch clients from Business Central" });
  }
});

/**
 * Fetch existing "commerciales" from Business Central.
 */
app.get("/api/commerciales", async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(process.env.BC_COMMERCIALES_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const rawCommerciales = response.data.value || [];
    const mappedCommerciales = rawCommerciales.map((c) => ({
      id: c.id || "N/A",
      code: c.code || c.Code || "—",
      name: c.name || c.displayName || "Inconnu",
      email: c.email || c.Email || "—",
      phoneNo: c.phoneNo || c.phoneNumber || "—",
      jobTitle: c.jobTitle || c.JobTitle || "Commercial",
    }));

    res.json(mappedCommerciales);
  } catch (error) {
    console.error(
      "Error fetching commerciales:",
      error.response?.data || error.message,
    );
    res
      .status(500)
      .json({ error: "Failed to fetch commerciales from Business Central" });
  }
});

/**
 * Create a new "commerciale" in Business Central.
 */
/**
 * Fetch articles from Business Central.
 */
app.get("/api/articles", async (req, res) => {
  try {
    const token = await getAccessToken();

    const tenantId = process.env.BC_TENANT_ID;
    const env = process.env.BC_ENV;
    const companyId = process.env.BC_COMPANY_ID;

    const bcUrl =
      `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${env}` +
      `/api/dynamics/prechange/v2.0/companies(${companyId})/Articles`;

    const { data } = await axios.get(bcUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // Map the BC response to a simpler format for the frontend
    const rawArticles = data.value || [];
    const mappedArticles = rawArticles.map((art) => ({
      id: art.id || "",
      number: art.number || art.no || "",
      displayName: art.displayName || art.description || "Article sans nom",
      type: art.type || "Inconnu",
      baseUnitOfMeasure: art.baseUnitOfMeasure || "Pcs",
      unitPrice: art.unitPrice || 0,
      itemCategoryCode: art.itemCategoryCode || "",
      itemSubCategoryCode: art.itemSubCategoryCode || "",
    }));

    res.json(mappedArticles);
  } catch (err) {
    console.error(
      "Error fetching articles:",
      err.response?.data || err.message,
    );
    const status = err.response?.status || 500;
    res.status(status).json({
      message: "Failed to fetch Articles from Business Central",
      details: err.response?.data || err.message,
    });
  }
});

app.post("/api/commerciales", async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.post(
      process.env.BC_COMMERCIALES_URL,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error creating commerciale:",
      error.response?.data || error.message,
    );
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Failed to create commerciale" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
