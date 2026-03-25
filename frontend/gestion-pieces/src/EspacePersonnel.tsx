import  { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
    id: "A-8891",
    article: "Filtre a huile - Serie Z",
    date: "2026-03-21",
    quantite: "12 pcs",
    total: "1 560 DT",
  },
  {
    id: "A-8874",
    article: "Plaquettes frein AV",
    date: "2026-03-15",
    quantite: "8 pcs",
    total: "2 120 DT",
  },
  {
    id: "A-8858",
    article: "Courroie accessoire",
    date: "2026-03-09",
    quantite: "4 pcs",
    total: "760 DT",
  },
  {
    id: "A-8844",
    article: "Kit embrayage",
    date: "2026-03-03",
    quantite: "2 pcs",
    total: "3 840 DT",
  },
];

const EspacePersonnel = () => {
  const [role, setRole] = useState<Role>("commercial");
  const [clients, setClients] = useState<BCClient[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const [clientsError, setClientsError] = useState<string | null>(null);

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
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 lg:p-10 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-light mb-2 tracking-tight">
                  Espace personnel
                </h1>
                <p className="text-blue-100 font-light opacity-80">
                  Tableau de bord personnalise selon votre profil.
                </p>
              </div>
              <div className="flex items-center bg-white/10 border border-white/20 rounded-xl p-1 w-full lg:w-auto">
                {(["commercial", "client"] as Role[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex-1 px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                      role === value
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-blue-100 hover:text-white"
                    }`}
                  >
                    {value === "commercial" ? "Commercial" : "Client"}
                  </button>
                ))}
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
                  {clientHistory.map((row) => (
                    <div
                      key={row.id}
                      className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm text-slate-500">{row.id}</div>
                        <div className="text-base font-medium text-slate-800">
                          {row.article}
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">{row.date}</div>
                      <div className="text-sm text-slate-600">{row.quantite}</div>
                      <div className="text-sm font-semibold text-slate-800">
                        {row.total}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs font-light tracking-widest uppercase">
        Dynamics 365 Business Central | Personal Workspace
      </footer>
    </div>
    </>
  );
};

export default EspacePersonnel;
