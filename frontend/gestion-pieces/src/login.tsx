import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, ArrowRight, ShieldCheck, User as UserIcon, Briefcase } from "lucide-react";
import CommercialesNavbar from "./components/CommercialesNavbar";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [role, setRole] = useState("client"); // default to client
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const brandBlue = "oklch(60.9% 0.126 221.723)";
  const softBg = "#f8fafc";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

    try {
      if (isActivating) {
        // Activation flow
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Les mots de passe ne correspondent pas");
        }

        const response = await fetch(`${BACKEND_URL}/api/auth/activate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            role: role
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Échec de l'activation");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/espace-personnel");
      } else {
        // Login flow
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            role: role
          }),
        });

        const data = await response.json();
        
        if (response.status === 200 && data.needs_activation) {
          setIsActivating(true);
          setMessage("Votre compte a été trouvé dans Business Central. Veuillez choisir un mot de passe pour l'activer.");
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error(data.message || "Identifiants invalides");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/espace-personnel");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CommercialesNavbar />
      <div
        className="h-screen flex flex-col font-sans"
        style={{ backgroundColor: softBg }}
      >
        <div className="max-w-md mx-auto w-full flex flex-col justify-center h-full px-4">
          <div className="mb-8 px-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[9px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-1">
              <span>Sécurité</span>
              <span className="text-gray-200">/</span>
              <span style={{ color: brandBlue }}>
                {isActivating ? "Activation de Compte" : "Accès Portail"}
              </span>
            </div>
            <h1 className="text-xl font-normal text-gray-800 tracking-tight leading-none">
              {isActivating ? "Configurer mon mot de passe" : "Connexion au Registre"}
            </h1>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 p-3 flex items-center gap-2 rounded-xl mb-4 flex-none">
              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <p className="text-[10px] text-red-700 uppercase tracking-widest font-normal">
                {error}
              </p>
            </div>
          )}

          {message && (
            <div className="bg-blue-50 border border-blue-100 p-3 flex items-center gap-2 rounded-xl mb-4 flex-none">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <p className="text-[10px] text-blue-700 uppercase tracking-widest font-normal">
                {message}
              </p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-none">
            <div className="px-6 py-3 border-b border-gray-50 flex justify-between items-center bg-white flex-none">
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-gray-300" />
                <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-normal italic">
                  Session chiffrée SSL
                </span>
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400/50" />
            </div>

            {/* Role Selection Tabs */}
            {!isActivating && (
              <div className="flex border-b border-gray-50">
                <button
                  onClick={() => setRole("client")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 ${
                    role === "client" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <UserIcon className="w-3 h-3" />
                  Client
                </button>
                <button
                  onClick={() => setRole("commercial")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 ${
                    role === "commercial" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  Commercial
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 space-y-5 flex-1">
              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">
                  Identifiant (Numéro / Email)
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  readOnly={isActivating}
                  placeholder={role === "client" ? "N° Client" : "Email Commercial"}
                  className={`w-full px-4 py-2.5 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors ${isActivating ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50/50'}`}
                />
              </div>

              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">
                  {isActivating ? "Nouveau Mot de passe" : "Mot de passe"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors"
                />
              </div>

              {isActivating && (
                <div>
                  <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: brandBlue }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-white rounded-lg font-normal text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                    <span>Traitement...</span>
                  </div>
                ) : (
                  <>
                    {isActivating ? "Activer mon compte" : "Se connecter"} <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              
              {isActivating && (
                <button
                  type="button"
                  onClick={() => setIsActivating(false)}
                  className="w-full text-center text-[9px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors mt-2"
                >
                  Retour à la connexion
                </button>
              )}
            </form>
          </div>

          <div className="mt-12 text-center flex-none">
            <span className="text-[8px] text-gray-300 uppercase tracking-[0.3em] font-normal">
              Système Certifié v2.0
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
