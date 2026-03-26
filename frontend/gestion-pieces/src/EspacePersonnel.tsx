import  { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchBCClients, type BCClient } from "./services/api";
import CommercialesNavbar from "./components/CommercialesNavbar";



type Role = "commercial" | "client";

const commercialSales = [
  {
    id: "V-1045",
    client: "Garage El Amel",
    date: "2026-03-22",
    montant: "12 450 DT",
    statut: "Payee",
  },
  {
    id: "V-1044",
    client: "Auto Speed",
    date: "2026-03-20",
    montant: "6 980 DT",
    statut: "En cours",
  },
  {
    id: "V-1043",
    client: "Pieces Express",
    date: "2026-03-18",
    montant: "9 120 DT",
    statut: "Payee",
  },
  {
    id: "V-1042",
    client: "Meca Plus",
    date: "2026-03-16",
    montant: "4 760 DT",
    statut: "En attente",
  },
];

const clientHistory = [
  {
    id: "BC-CMD-2026-001",
    date: "2026-03-21",
    total: "1 560 DT",
    status: "Livrée",
    items: [
      { id: "P001", designation: "Filtre à huile - Série Z", quantite: 10, prixUnitaire: "120 DT", total: "1 200 DT" },
      { id: "P002", designation: "Joint de vidange", quantite: 12, prixUnitaire: "30 DT", total: "360 DT" }
    ]
  },
  {
    id: "BC-CMD-2026-002",
    date: "2026-03-15",
    total: "2 120 DT",
    status: "En cours",
    items: [
      { id: "P003", designation: "Plaquettes frein AV", quantite: 8, prixUnitaire: "265 DT", total: "2 120 DT" }
    ]
  },
  {
    id: "BC-CMD-2026-003",
    date: "2026-03-09",
    total: "760 DT",
    status: "Livrée",
    items: [
      { id: "P004", designation: "Courroie accessoire", quantite: 4, prixUnitaire: "190 DT", total: "760 DT" }
    ]
  },
  {
    id: "BC-CMD-2026-004",
    date: "2026-03-03",
    total: "3 840 DT",
    status: "Annulée",
    items: [
      { id: "P005", designation: "Kit embrayage", quantite: 2, prixUnitaire: "1 920 DT", total: "3 840 DT" }
    ]
  },
];

const EspacePersonnel = () => {
  const [user, setUser] = useState<{ username: string; role: Role } | null>(null);
  const [role, setRole] = useState<Role>("commercial");
  const [clients, setClients] = useState<BCClient[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const [clientsError, setClientsError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof clientHistory[0] | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  useEffect(() => {
    if (role !== "commercial") {
      return;
    }

    const loadClients = async () => {
      setIsLoadingClients(true);
      setClientsError(null);
      try {
        const data = await fetchBCClients();
        setClients(data);
      } catch (err) {
        console.error("Failed to load clients for personal space", err);
        setClientsError(
          "Impossible de charger les clients. Verifiez que le backend est demarre.",
        );
      } finally {
        setIsLoadingClients(false);
      }
    };

    loadClients();
  }, [role]);

  const visibleClients = useMemo(() => clients.slice(0, 6), [clients]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
    <CommercialesNavbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 120, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

    

      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
        >
          <div className="bg-[#f8f8f8] p-6 lg:p-6 text-[#1f1f1f] border-b border-[#e1e1e1]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl font-medium mb-1 tracking-tight">
                  {user?.username || "Chargement..."}
                </h1>
                <p className="text-[#5f5f5f] font-normal uppercase text-[10px] tracking-widest">
                  Espace {role === "commercial" ? "Commercial" : "Client"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-normal">Session active</span>
                  <span className="text-xs font-medium text-emerald-500">En ligne</span>
                </div>
                <button 
                  onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
                  className="bg-white border border-gray-200 text-[10px] uppercase font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {role === "commercial" ? (
            <div className="p-8 lg:p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    label: "Stock disponible",
                    value: "312 articles",
                    detail: "49 en alerte",
                    accent: "from-emerald-500 to-emerald-700",
                  },
                  {
                    label: "Ventes ce mois",
                    value: "94 500 DT",
                    detail: "+12.4% vs mois precedent",
                    accent: "from-blue-500 to-blue-700",
                  },
                  {
                    label: "Clients actifs",
                    value: isLoadingClients
                      ? "Chargement..."
                      : `${clients.length} comptes`,
                    detail: "Top 6 ci-dessous",
                    accent: "from-amber-500 to-amber-700",
                  },
                ].map((card) => (
                  <motion.div
                    key={card.label}
                    {...fadeIn}
                    className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">{card.label}</span>
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.accent} opacity-90`}
                      />
                    </div>
                    <div className="text-2xl font-semibold text-slate-800">
                      {card.value}
                    </div>
                    <div className="text-xs text-slate-500">{card.detail}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-8">
                <motion.div {...fadeIn} className="bg-slate-50/60 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                      Dernieres ventes
                    </h2>
                    <span className="text-xs uppercase tracking-widest text-slate-400">
                      7 jours
                    </span>
                  </div>
                  <div className="space-y-4">
                    {commercialSales.map((sale) => (
                      <div
                        key={sale.id}
                        className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div>
                          <div className="text-sm text-slate-500">{sale.id}</div>
                          <div className="text-base font-medium text-slate-800">
                            {sale.client}
                          </div>
                        </div>
                        <div className="text-sm text-slate-500">{sale.date}</div>
                        <div className="text-sm font-semibold text-slate-800">
                          {sale.montant}
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            sale.statut === "Payee"
                              ? "bg-emerald-100 text-emerald-700"
                              : sale.statut === "En cours"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {sale.statut}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeIn} className="bg-white rounded-2xl border border-blue-100/50 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                      Clients recents
                    </h2>
                    <Link
                      to="/clients"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Voir tout
                    </Link>
                  </div>
                  {isLoadingClients ? (
                    <div className="py-8 text-center text-sm text-slate-400">
                      Chargement des clients...
                    </div>
                  ) : clientsError ? (
                    <div className="py-8 text-center text-sm text-red-500">
                      {clientsError}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {visibleClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {client.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {client.ville || "Ville inconnue"}
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 font-mono">
                            {client.id}
                          </div>
                        </div>
                      ))}
                      {visibleClients.length === 0 && (
                        <div className="text-sm text-slate-400">
                          Aucun client disponible.
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="p-8 lg:p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total achats", value: "8 280 DT", trend: "+6.2%" },
                  { label: "Commandes", value: "26", trend: "2 en cours" },
                  { label: "Remise obtenue", value: "4.5%", trend: "VIP" },
                ].map((card) => (
                  <motion.div
                    key={card.label}
                    {...fadeIn}
                    className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex flex-col gap-2"
                  >
                    <span className="text-sm text-slate-500">{card.label}</span>
                    <div className="text-2xl font-semibold text-slate-800">
                      {card.value}
                    </div>
                    <div className="text-xs text-slate-500">{card.trend}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeIn} className="bg-slate-50/60 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Historique des achats
                  </h2>
                  <span className="text-xs uppercase tracking-widest text-slate-400">
                    30 jours
                  </span>
                </div>
                <div className="space-y-4">
                  {clientHistory.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{order.id}</span>
                          <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            order.status === "Livrée" ? "bg-emerald-50 text-emerald-600" :
                            order.status === "En cours" ? "bg-blue-50 text-blue-600" :
                            "bg-rose-50 text-rose-600"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-slate-800">
                          Commande du {order.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-xs text-slate-500">
                          {order.items.length} produit{order.items.length > 1 ? 's' : ''}
                        </div>
                        <div className="text-sm font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">
                          {order.total}
                        </div>
                        <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Modal Détails Commande */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-blue-100"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Détails de la commande</h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">{selectedOrder.id} • {selectedOrder.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  <table className="w-full text-left">
                    <thead className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      <tr>
                        <th className="pb-3 font-medium">Produit</th>
                        <th className="pb-3 font-medium text-center">Qté</th>
                        <th className="pb-3 font-medium text-right">Unit.</th>
                        <th className="pb-3 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="group">
                          <td className="py-4">
                            <div className="text-sm font-medium text-slate-800">{item.designation}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.id}</div>
                          </td>
                          <td className="py-4 text-center">
                            <span className="text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{item.quantite}</span>
                          </td>
                          <td className="py-4 text-right text-sm text-slate-500">{item.prixUnitaire}</td>
                          <td className="py-4 text-right text-sm font-semibold text-slate-800">{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    selectedOrder.status === "Livrée" ? "bg-emerald-100 text-emerald-700" :
                    selectedOrder.status === "En cours" ? "bg-blue-100 text-blue-700" :
                    "bg-rose-100 text-rose-700"
                  }`}>
                    {selectedOrder.status}
                  </span>
                  <span className="text-xs text-slate-400">Paiement effectué</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-slate-500">Total Global:</span>
                  <span className="text-2xl font-black text-blue-600">{selectedOrder.total}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-slate-400 text-xs font-light tracking-widest uppercase">
        Dynamics 365 Business Central | Personal Workspace
      </footer>
    </div>
    </>
  );
};

export default EspacePersonnel;

