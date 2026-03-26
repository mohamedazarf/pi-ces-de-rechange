import { useState, useEffect } from "react";
import { motion} from "framer-motion";
import { fetchBCClients, BCClient } from "./services/api";
import CommercialesNavbar from "./components/CommercialesNavbar";

const Clients = () => {
  const [clients, setClients] = useState<BCClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBCClients();
      setClients(data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
      setError("Impossible de charger la liste des clients. Vérifiez si le serveur backend est démarré.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <CommercialesNavbar />
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

      

      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
        >
          {/* Header & Search */}
          <div className="bg-[#f8f8f8] p-6 lg:p-6 text-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#e1e1e1]">
            <div>
              <h1 className="text-2xl font-medium mb-1 tracking-tight">Liste des Clients</h1>
              <p className="text-[#5f5f5f] font-normal">
                Consultez et gérez vos clients synchronisés depuis Business Central.
              </p>
            </div>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0078D4] transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-slate-500 font-light">Chargement des clients...</p>
              </div>
            ) : error ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">Erreur de chargement</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">{error}</p>
                <button
                  onClick={loadClients}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#e1e1e1]">
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">ID / Nom</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Ville</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Téléphone</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Crédit / Limite</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">Remise</th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f] text-right">Dernière Op.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ededed]">
                  {filteredClients.map((client) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group hover:bg-[#f5f9ff] transition-colors"
                    >
                      <td className="px-5 py-2.5">
                        <div className="font-medium text-slate-900">{client.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-1">{client.id}</div>
                      </td>
                      <td className="px-5 py-2.5 text-slate-700">{client.ville || "-"}</td>
                      <td className="px-5 py-2.5 text-slate-700 font-mono text-sm">{client.tel || "-"}</td>
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-blue-600">{client.credit.toFixed(2)} DT</span>
                          <span className="text-slate-300">/</span>
                          <span className="text-slate-400 text-sm">{client.limit.toFixed(0)}</span>
                        </div>
                        {client.encours > 0 && (
                          <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
                            En cours: {client.encours.toFixed(2)}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-2.5">
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                          {client.remise}%
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-right">
                        <div className="text-slate-700 text-sm">{client.derniere || "Jamais"}</div>
                        {client.alerte && (
                          <div className="text-[10px] text-red-500 font-medium mt-1">
                            ⚠️ {client.alerte}
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                  {filteredClients.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-8 py-10 text-center text-slate-400 font-light">
                        Aucun client trouvé pour "{searchTerm}"
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
        Dynamics 365 Business Central | Client Intelligence Dashboard
      </footer>
    </div>
    </>
  );
};

export default Clients;


