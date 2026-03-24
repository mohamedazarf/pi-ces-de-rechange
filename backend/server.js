const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${process.env.BC_TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.BC_CLIENT_ID);
  params.append('client_secret', process.env.BC_CLIENT_SECRET);
  params.append('scope', process.env.BC_SCOPE);

  try {
    const response = await axios.post(tokenUrl, params);
    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error fetching BC token:', error.response?.data || error.message);
    throw new Error('Failed to fetch access token');
  }
}

/**
 * Fetch clients from Business Central.
 * Maps BC response fields to the structure used by the frontend.
 */
app.get('/api/clients', async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(process.env.BC_API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
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
      alerte: c.blocked ? "Crédit bloqué" : (c.balance > c.creditLimit && c.creditLimit > 0 ? "Limite dépassée" : null),
      derniere: c.lastModifiedDateTime ? new Date(c.lastModifiedDateTime).toISOString().split('T')[0] : "—",
    }));

    res.json(mappedClients);
  } catch (error) {
    console.error('Error fetching BC clients:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch clients from Business Central' });
  }
});

/**
 * Fetch existing "commerciales" from Business Central.
 */
app.get('/api/commerciales', async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(process.env.BC_COMMERCIALES_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    const rawCommerciales = response.data.value || [];
    res.json(rawCommerciales);
  } catch (error) {
    console.error('Error fetching commerciales:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch commerciales from Business Central' });
  }
});

/**
 * Create a new "commerciale" in Business Central.
 */
/**
 * Fetch articles from Business Central.
 */
app.get('/api/articles', async (req, res) => {
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
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
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
    }));

    res.json(mappedArticles);
  } catch (err) {
    console.error('Error fetching articles:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    res.status(status).json({
      message: "Failed to fetch Articles from Business Central",
      details: err.response?.data || err.message,
    });
  }
});

app.post('/api/commerciales', async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.post(process.env.BC_COMMERCIALES_URL, req.body, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error creating commerciale:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to create commerciale' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
