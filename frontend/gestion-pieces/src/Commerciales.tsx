import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCommerciales, createCommerciale } from "./services/api";
import type { BCCommerciale } from "./services/api";
import CommercialesNavbar from "./components/CommercialesNavbar";

const Commerciales = () => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    phoneNo: "",
    JobTitle: "commercial",
    MotdePasse: "",
  });
  const [existingCommerciales, setExistingCommerciales] = useState<BCCommerciale[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [backendError, setBackendError] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    loadExistingCommerciales();
  }, []);

  const loadExistingCommerciales = async () => {
    setIsListLoading(true);
    try {
      const data = await fetchCommerciales();
      setExistingCommerciales(data);
      setBackendError(false);
    } catch (error) {
      console.error("Failed to fetch existing commercials", error);
      setBackendError(true);
    } finally {
      setIsListLoading(false);
    }
  };

  const handleNameChange = (val: string) => {
    const abbreviation = val
      .split(" ")
      .filter((part) => part.length > 0)
      .map((part) => part[0].toUpperCase())
      .join("");

    let nextCode = "";
    if (abbreviation) {
      const relevantCodes = existingCommerciales
        .map((c) => c.code || "")
        .filter((code) => code.toUpperCase().startsWith(abbreviation.toUpperCase()));

      let nextNumber = 1;
      if (relevantCodes.length > 0) {
        const numbers = relevantCodes.map((code) => {
          const numPart = code.toUpperCase().replace(abbreviation.toUpperCase(), "");
          return parseInt(numPart) || 0;
        });
        nextNumber = Math.max(...numbers, 0) + 1;
      }
      nextCode = `${abbreviation}${nextNumber}`;
    }

    setFormData((prev) => ({ ...prev, name: val, code: nextCode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) {
      setStatus({ type: "error", message: "Le code est obligatoire. Veuillez saisir un nom valide." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await createCommerciale(formData);
      setStatus({ type: "success", message: "Commerciale créé avec succès !" });
      setFormData({
        code: "",
        name: "",
        email: "",
        phoneNo: "",
        JobTitle: "commercial",
        MotdePasse: "",
      });
      loadExistingCommerciales();
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erreur lors de la création du commerciale. Vérifiez si le serveur est démarré.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCommerciales = existingCommerciales.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col relative overflow-hidden">
      {/* Grid Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 120, 212, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <CommercialesNavbar />

      <main className="flex-1 pt-32 pb-20 px-6 flex justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#f8f8f8] p-6 lg:p-6 text-[#1f1f1f] border-b border-[#e1e1e1]">
            <h1 className="text-2xl font-medium mb-1 tracking-tight">
              Nouveau Commercial
            </h1>
            <p className="text-[#5f5f5f] font-normal">
              Créez un nouvel agent de vente avec génération automatique de
              code.
            </p>
          </div>

          <div className="p-8 lg:p-12 space-y-8">
            {/* Backend Connectivity Warning */}
            {backendError && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-800 text-sm"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Attention: Impossible de charger les codes existants. Veuillez redémarrer le backend (`npm start`) pour assurer l'unicité des codes.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl 
focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 
outline-none transition-all text-slate-800 placeholder:text-slate-500"
                  placeholder="ex: Mohamed Aziz Arfaoui"
                />
              </div>

              {/* Code Field (Read Only or Auto) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Code (Généré)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formData.code}
                    className="w-full px-4 py-3 bg-blue-50/50 border border-blue-200 rounded-xl text-blue-700 font-mono font-bold outline-none"
                    placeholder="Auto-généré"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Titre du Poste
                </label>
                <input
                  type="text"
                  value={formData.JobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, JobTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl 
focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 
outline-none transition-all text-slate-800 placeholder:text-slate-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl 
focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 
outline-none transition-all text-slate-800 placeholder:text-slate-500"
                  placeholder="email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="text"
                  required
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNo: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl 
focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 
outline-none transition-all text-slate-800 placeholder:text-slate-500"
                  placeholder="06 12 34 56 78"
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mot de Passe
                </label>
                <input
                  type="password"
                  required
                  value={formData.MotdePasse}
                  onChange={(e) =>
                    setFormData({ ...formData, MotdePasse: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl 
focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 
outline-none transition-all text-slate-800 placeholder:text-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Status Message */}
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-xl text-sm ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Traitement...
                </>
              ) : (
                "Créer le Commercial"
              )}
            </button>
          </form>
          </div>
        </motion.div>

        {/* Commerciales List Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl mt-12 bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
        >
          <div className="bg-[#f8f8f8] p-4 text-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e1e1e1]">
            <div>
              <h2 className="text-lg font-medium tracking-tight">Liste des Commerciaux</h2>
              <p className="text-[#5f5f5f] text-sm font-normal">
                Gérez les agents de vente existants.
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 bg-white border border-[#d0d0d0] rounded-md text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0078D4] transition-all text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isListLoading ? (
              <div className="p-12 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-500 text-sm font-light">Chargement des commerciaux...</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#e1e1e1]">
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Code / Nom</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Email</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Téléphone</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Poste</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ededed]">
                  {filteredCommerciales.map((c) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-[#f5f9ff] transition-colors"
                    >
                      <td className="px-5 py-2.5">
                        <div className="font-medium text-slate-900">{c.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{c.code}</div>
                      </td>
                      <td className="px-5 py-2.5 text-slate-700 text-sm">{c.email}</td>
                      <td className="px-5 py-2.5 text-slate-700 font-mono text-sm">{c.phoneNo}</td>
                      <td className="px-5 py-2.5">
                        <span className="px-2 py-0.5 bg-[#eef6ff] text-[#106EBE] rounded-full text-xs font-medium">
                          {c.jobTitle}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredCommerciales.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-light text-sm">
                        Aucun commercial trouvé.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <footer className="py-8 text-center text-slate-400 text-xs font-light tracking-widest uppercase">
        Dynamics 365 Business Central | Secure Agent Management
      </footer>
    </div>
  );
};

export default Commerciales;



