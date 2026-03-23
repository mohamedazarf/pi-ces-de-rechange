import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Phone,
  Clock,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Package,
  TrendingUp,
  Calendar,
  MapPin,
  Filter,
  X,
  ChevronRight,
  Truck,
  Info,
  Loader2,
} from "lucide-react";
import { fetchBCClients, type BCClient } from "./services/api";

// ==================== DATA ====================
const CLIENTS = [
  {
    id: "C-4201",
    name: "Garage Benali",
    ville: "Tunis",
    tel: "71 234 567",
    credit: 15000,
    encours: 4200,
    limit: 20000,
    remise: 12,
    alerte: null,
    derniere: "2026-02-28",
  },
  {
    id: "C-4202",
    name: "Auto Pièces Sfax",
    ville: "Sfax",
    tel: "74 456 789",
    credit: 8000,
    encours: 7800,
    limit: 10000,
    remise: 8,
    alerte: "Encours proche limite",
    derniere: "2026-03-01",
  },
  {
    id: "C-4203",
    name: "Mécanique Générale Sousse",
    ville: "Sousse",
    tel: "73 321 654",
    credit: 22000,
    encours: 3100,
    limit: 25000,
    remise: 15,
    alerte: null,
    derniere: "2026-03-04",
  },
  {
    id: "C-4204",
    name: "Garage El Amri",
    ville: "Bizerte",
    tel: "72 111 222",
    credit: 5000,
    encours: 4900,
    limit: 5000,
    remise: 5,
    alerte: "Crédit bloqué — limite atteinte",
    derniere: "2026-01-15",
  },
  {
    id: "C-4205",
    name: "Station Technique Monastir",
    ville: "Monastir",
    tel: "73 555 666",
    credit: 18000,
    encours: 2000,
    limit: 20000,
    remise: 10,
    alerte: null,
    derniere: "2026-03-05",
  },
];

const HISTORIQUE = {
  "C-4201": [
    { date: "2026-02-28", ref: "CMD-9912", montant: 1245.0, statut: "Livrée" },
    { date: "2026-02-15", ref: "CMD-9870", montant: 890.5, statut: "Livrée" },
    { date: "2026-01-20", ref: "CMD-9801", montant: 2100.0, statut: "Livrée" },
  ],
  "C-4202": [
    {
      date: "2026-03-01",
      ref: "CMD-9920",
      montant: 3200.0,
      statut: "En cours",
    },
    { date: "2026-02-10", ref: "CMD-9845", montant: 1500.0, statut: "Livrée" },
  ],
  "C-4203": [
    {
      date: "2026-03-04",
      ref: "CMD-9945",
      montant: 670.0,
      statut: "En préparation",
    },
    { date: "2026-02-20", ref: "CMD-9880", montant: 1890.0, statut: "Livrée" },
  ],
  "C-4204": [
    { date: "2026-01-15", ref: "CMD-9780", montant: 450.0, statut: "Livrée" },
  ],
  "C-4205": [
    { date: "2026-03-05", ref: "CMD-9950", montant: 980.0, statut: "En cours" },
    { date: "2026-02-25", ref: "CMD-9900", montant: 1340.0, statut: "Livrée" },
    { date: "2026-02-01", ref: "CMD-9820", montant: 2200.0, statut: "Livrée" },
  ],
};

const PIECES = [
  {
    ref: "FLT-OIL-208",
    designation: "Filtre à huile",
    marque: "Mann Filter",
    oem: "1109.AY",
    vehicule: "Peugeot 208 1.6 HDi",
    prix: 18.5,
    stock: 45,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Filtration",
    color: "#8b5cf6",
  },
  {
    ref: "FLT-OIL-301",
    designation: "Filtre à huile",
    marque: "Purflux",
    oem: "1109.CK",
    vehicule: "Peugeot 301 1.6 HDi",
    prix: 21.0,
    stock: 0,
    entrepot: "—",
    reappro: "2026-03-12",
    equiv: "FLT-OIL-208",
    categorie: "Filtration",
    color: "#8b5cf6",
  },
  {
    ref: "PLQ-AVT-CLO",
    designation: "Plaquettes frein avant",
    marque: "TRW",
    oem: "4254.20",
    vehicule: "Renault Clio IV",
    prix: 42.8,
    stock: 22,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Freinage",
    color: "#ef4444",
  },
  {
    ref: "PLQ-AVT-SYM",
    designation: "Plaquettes frein avant",
    marque: "Ferodo",
    oem: "4253.96",
    vehicule: "Renault Symbol",
    prix: 38.5,
    stock: 8,
    entrepot: "Sfax Dépôt",
    reappro: null,
    categorie: "Freinage",
    color: "#ef4444",
  },
  {
    ref: "AMR-AVT-208",
    designation: "Amortisseur avant gauche",
    marque: "Monroe",
    oem: "5202.VY",
    vehicule: "Peugeot 208",
    prix: 135.0,
    stock: 6,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Suspension",
    color: "#f59e0b",
  },
  {
    ref: "AMR-AVT-208K",
    designation: "Amortisseur avant gauche",
    marque: "Kayaba",
    oem: "5202.VY",
    vehicule: "Peugeot 208",
    prix: 118.0,
    stock: 12,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Suspension",
    color: "#f59e0b",
  },
  {
    ref: "KIT-DIST-DCI",
    designation: "Kit distribution",
    marque: "Gates",
    oem: "130C17529R",
    vehicule: "Renault 1.5 dCi",
    prix: 195.0,
    stock: 3,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Distribution",
    color: "#06b6d4",
  },
  {
    ref: "BUG-ALT-POLO",
    designation: "Bougie d'allumage",
    marque: "NGK",
    oem: "101905631H",
    vehicule: "VW Polo 1.4 TSi",
    prix: 12.5,
    stock: 80,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Allumage",
    color: "#f97316",
  },
  {
    ref: "FLT-AIR-CLO4",
    designation: "Filtre à air",
    marque: "Mahle",
    oem: "165467674R",
    vehicule: "Renault Clio IV",
    prix: 24.0,
    stock: 30,
    entrepot: "Sfax Dépôt",
    reappro: null,
    categorie: "Filtration",
    color: "#8b5cf6",
  },
  {
    ref: "RAD-EAU-GOLF",
    designation: "Radiateur d'eau",
    marque: "Valeo",
    oem: "1K0121251DM",
    vehicule: "VW Golf VII",
    prix: 210.0,
    stock: 2,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Refroidissement",
    color: "#3b82f6",
  },
  {
    ref: "CRO-DIR-208",
    designation: "Crémaillère direction",
    marque: "TRW",
    oem: "4001.KN",
    vehicule: "Peugeot 208",
    prix: 320.0,
    stock: 0,
    entrepot: "—",
    reappro: "2026-03-18",
    categorie: "Direction",
    color: "#10b981",
  },
  {
    ref: "EMB-KIT-CLO",
    designation: "Kit embrayage complet",
    marque: "Valeo",
    oem: "302050901R",
    vehicule: "Renault Clio IV 1.5 dCi",
    prix: 285.0,
    stock: 5,
    entrepot: "Tunis Central",
    reappro: null,
    categorie: "Embrayage",
    color: "#ec4899",
  },
];

const TOURNEES = [
  {
    zone: "Tunis / Ariana / Ben Arous",
    delai: "Même jour (avant 14h)",
    prochaine: "Aujourd'hui 16:00",
  },
  { zone: "Sousse / Monastir", delai: "J+1", prochaine: "Demain 08:00" },
  { zone: "Sfax", delai: "J+1 à J+2", prochaine: "Demain 14:00" },
  { zone: "Bizerte", delai: "J+1", prochaine: "Demain 10:00" },
  { zone: "Autres régions", delai: "J+2 à J+3", prochaine: "08/03/2026" },
];

const CAT_ICONS = {
  Filtration: "🔧",
  Freinage: "🛑",
  Suspension: "🔩",
  Distribution: "⚙️",
  Allumage: "⚡",
  Refroidissement: "❄️",
  Direction: "🎯",
  Embrayage: "🔗",
};

interface Piece {
  ref: string;
  designation: string;
  marque: string;
  oem: string;
  vehicule: string;
  prix: number;
  stock: number;
  entrepot: string;
  reappro: string | null;
  categorie: string;
  color: string;
  equiv?: string;
}

interface CartItem extends Piece {
  qty: number;
}

// ==================== MAIN COMPONENT ====================
export default function App() {
  const [clients, setClients] = useState<BCClient[]>(CLIENTS);
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<BCClient | null>(null);
  const [clientSearch, setClientSearch] = useState("");
  const [pieceSearch, setPieceSearch] = useState("");
  const [searchField, setSearchField] = useState("tous");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [callTime, setCallTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  // Fetch clients from Business Central
  useEffect(() => {
    setIsLoadingClients(true);
    fetchBCClients()
      .then((data) => {
        if (data && data.length > 0) {
          setClients(data);
        }
        setIsLoadingClients(false);
      })
      .catch((err) => {
        console.error("Failed to load clients from BC:", err);
        setClientError("Impossible de charger les clients Business Central");
        setIsLoadingClients(false);
        // Keep hardcoded CLIENTS as fallback
      });
  }, []);

  // Timer d'appel
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isCallActive) {
      interval = setInterval(() => setCallTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Filtrage clients
  const filteredClients = useMemo(() => {
    if (!clientSearch.trim()) return clients;
    const q = clientSearch.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.ville || "").toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [clientSearch, clients]);

  // Filtrage pièces
  const filteredPieces = useMemo(() => {
    if (!pieceSearch.trim()) return PIECES;
    const q = pieceSearch.toLowerCase();
    return PIECES.filter((p) => {
      if (searchField === "tous") {
        return (
          p.ref.toLowerCase().includes(q) ||
          p.designation.toLowerCase().includes(q) ||
          p.vehicule.toLowerCase().includes(q) ||
          p.marque.toLowerCase().includes(q) ||
          p.oem.toLowerCase().includes(q)
        );
      }
      if (searchField === "ref") return p.ref.toLowerCase().includes(q);
      if (searchField === "vehicule")
        return p.vehicule.toLowerCase().includes(q);
      if (searchField === "marque") return p.marque.toLowerCase().includes(q);
      return false;
    });
  }, [pieceSearch, searchField]);

  // Ajout au panier
  const addToCart = (piece: Piece) => {
    const existing = cart.find((item) => item.ref === piece.ref);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.ref === piece.ref ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...piece, qty: 1 }]);
    }
  };

  // Calculs panier
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.prix * item.qty,
    0,
  );
  const discount = selectedClient
    ? (cartSubtotal * selectedClient.remise) / 100
    : 0;
  const cartTotal = cartSubtotal - discount;
  const newEncours = (selectedClient?.encours || 0) + cartTotal;
  const isOverLimit = selectedClient && newEncours > selectedClient.limit;

  // Délai de livraison
  const getDeliveryInfo = () => {
    if (!selectedClient) return null;
    return (
      TOURNEES.find((t) =>
        t.zone.toLowerCase().includes(selectedClient.ville.toLowerCase()),
      ) || TOURNEES[TOURNEES.length - 1]
    );
  };

  const deliveryInfo = getDeliveryInfo();

  // Démarrer appel
  const startCall = (client: BCClient) => {
    setSelectedClient(client);
    setIsCallActive(true);
    setCallTime(0);
    setCart([]);
  };

  // Valider commande
  const validateOrder = () => {
    if (!selectedClient) return;
    if (isOverLimit) {
      alert(
        "⚠️ ATTENTION : Cette commande dépasse la limite de crédit autorisée !",
      );
      return;
    }

    const orderRef = `CMD-${Math.floor(Math.random() * 10000)}`;
    const message = `
✅ COMMANDE VALIDÉE

Référence: ${orderRef}
Client: ${selectedClient.name}
Montant TTC: ${cartTotal.toFixed(2)} TND
Remise: ${selectedClient.remise}% (-${discount.toFixed(2)} TND)

📦 Articles: ${cart.length}
🚚 Livraison: ${deliveryInfo?.delai}
📅 Prochaine tournée: ${deliveryInfo?.prochaine}

📧 Email de confirmation envoyé
📱 SMS de suivi envoyé au ${selectedClient.tel}
    `.trim();

    alert(message);

    // Reset
    setCart([]);
    setIsCallActive(false);
    setCallTime(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      {/* HEADER */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold text-white">AutoParts CRM</h1>
                <p className="text-xs text-slate-400">
                  Gestion des commandes téléphoniques
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isCallActive && (
              <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono font-semibold">
                  {formatTime(callTime)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 p-4 h-[calc(100vh-88px)]">
        {/* PANNEAU GAUCHE - CLIENTS */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          {/* Recherche client */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          {/* Liste clients */}
          <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Clients ({filteredClients.length})
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {isLoadingClients && (
                <div className="p-8 flex flex-col items-center justify-center gap-3 text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  <p className="text-sm">Chargement BC...</p>
                </div>
              )}
              {clientError && !isLoadingClients && (
                <div className="p-4 m-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{clientError}</span>
                </div>
              )}
              {!isLoadingClients && filteredClients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => startCall(client)}
                  className={`p-3 border-b border-slate-800/50 cursor-pointer transition-all hover:bg-slate-800/50 ${
                    selectedClient?.id === client.id
                      ? "bg-cyan-500/10 border-l-4 border-l-cyan-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">
                        {client.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">
                          {client.ville}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{client.id}</span>
                  </div>

                  {client.alerte && (
                    <div
                      className={`flex items-center gap-2 px-2 py-1 rounded text-xs mb-2 ${
                        client.alerte.includes("bloqué")
                          ? "bg-red-500/20 text-red-400 animate-pulse"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-xs">{client.alerte}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex-1 bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          client.encours / client.limit > 0.9
                            ? "bg-red-500"
                            : client.encours / client.limit > 0.7
                              ? "bg-amber-500"
                              : "bg-cyan-500"
                        }`}
                        style={{
                          width: `${Math.min((client.encours / client.limit) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-slate-400 whitespace-nowrap">
                      {client.encours.toLocaleString()} /{" "}
                      {client.limit.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fiche client détaillée */}
          {selectedClient && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl">
              <div className="mb-3 pb-3 border-b border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">
                    {selectedClient.name}
                  </h3>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                    Remise {selectedClient.remise}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-3 h-3" />
                  <span>{selectedClient.tel}</span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Encours actuel:</span>
                  <span className="font-semibold text-white">
                    {selectedClient.encours.toLocaleString()} TND
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Limite autorisée:</span>
                  <span className="font-semibold text-white">
                    {selectedClient.limit.toLocaleString()} TND
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Disponible:</span>
                  <span className="font-semibold text-emerald-400">
                    {(
                      selectedClient.limit - selectedClient.encours
                    ).toLocaleString()}{" "}
                    TND
                  </span>
                </div>
              </div>

              {deliveryInfo && (
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400">
                      Livraison
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {deliveryInfo.delai}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Prochaine: {deliveryInfo.prochaine}
                  </div>
                </div>
              )}

              {HISTORIQUE[selectedClient.id as keyof typeof HISTORIQUE] && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-400 mb-2">
                    Dernières commandes
                  </h4>
                  <div className="space-y-1.5">
                    {(HISTORIQUE[selectedClient.id as keyof typeof HISTORIQUE] || []).slice(0, 3).map((cmd: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs bg-slate-800/30 p-2 rounded"
                      >
                        <div>
                          <div className="text-slate-300 font-medium">
                            {cmd.ref}
                          </div>
                          <div className="text-slate-500">{cmd.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {cmd.montant.toFixed(2)} TND
                          </div>
                          <div
                            className={`text-xs ${
                              cmd.statut === "Livrée"
                                ? "text-emerald-400"
                                : cmd.statut === "En cours"
                                  ? "text-cyan-400"
                                  : "text-amber-400"
                            }`}
                          >
                            {cmd.statut}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PANNEAU CENTRAL - PIÈCES */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
          {/* Recherche pièces */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Rechercher une pièce..."
                  value={pieceSearch}
                  onChange={(e) => setPieceSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                />
              </div>
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="tous">Tous les champs</option>
                <option value="ref">Référence</option>
                <option value="vehicule">Véhicule</option>
                <option value="marque">Marque</option>
              </select>
            </div>
          </div>

          {/* Liste pièces */}
          <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                Catalogue ({filteredPieces.length} pièces)
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredPieces.map((piece) => {
                const isOutOfStock = piece.stock === 0;
                const isLowStock = piece.stock > 0 && piece.stock < 10;
                const equivalent = piece.equiv
                  ? PIECES.find((p) => p.ref === piece.equiv)
                  : null;

                return (
                  <div
                    key={piece.ref}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                          backgroundColor: `${piece.color}20`,
                          border: `1px solid ${piece.color}40`,
                        }}
                      >
                        {CAT_ICONS[piece.categorie as keyof typeof CAT_ICONS]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <h3 className="font-semibold text-white text-sm">
                              {piece.designation}
                            </h3>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {piece.marque}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-white">
                              {piece.prix.toFixed(2)} TND
                            </div>
                            <div className="text-xs text-slate-500">HT</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded font-mono">
                            {piece.ref}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded">
                            OEM: {piece.oem}
                          </span>
                          <span
                            className="px-2 py-0.5 text-xs rounded"
                            style={{
                              backgroundColor: `${piece.color}20`,
                              color: piece.color,
                            }}
                          >
                            {piece.categorie}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 mb-3">
                          🚗 {piece.vehicule}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isOutOfStock ? (
                              <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  Rupture de stock
                                </div>
                                {piece.reappro && (
                                  <div className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Réappro: {piece.reappro}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div
                                  className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                                    isLowStock
                                      ? "bg-amber-500/20 text-amber-400"
                                      : "bg-emerald-500/20 text-emerald-400"
                                  }`}
                                >
                                  <Package className="w-3 h-3" />
                                  Stock: {piece.stock}
                                </div>
                                <div className="text-xs text-slate-500">
                                  📍 {piece.entrepot}
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(piece)}
                            disabled={isOutOfStock && !equivalent}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                              isOutOfStock && !equivalent
                                ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                                : "bg-cyan-500 hover:bg-cyan-600 text-white"
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Ajouter
                          </button>
                        </div>

                        {equivalent && isOutOfStock && (
                          <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs font-semibold text-cyan-400">
                                Équivalence disponible
                              </span>
                            </div>
                            <div className="text-xs text-slate-300">
                              {equivalent.ref} - {equivalent.marque} (
                              {equivalent.stock} en stock)
                            </div>
                            <button
                              onClick={() => addToCart(equivalent)}
                              className="mt-2 px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white text-xs rounded flex items-center gap-1.5"
                            >
                              Voir équivalence
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANNEAU DROIT - PANIER */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  Panier ({cart.length})
                </h2>
                {cart.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Vider
                  </button>
                )}
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-slate-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Panier vide</p>
                  <p className="text-xs mt-1">
                    Ajoutez des pièces pour commencer
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-3"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 pr-2">
                          <h4 className="text-sm font-medium text-white">
                            {item.designation}
                          </h4>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {item.marque}
                          </div>
                          <div className="text-xs text-slate-500 font-mono mt-1">
                            {item.ref}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setCart(cart.filter((_, i) => i !== index))
                          }
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.qty > 1) {
                                setCart(
                                  cart.map((i, idx) =>
                                    idx === index
                                      ? { ...i, qty: i.qty - 1 }
                                      : i,
                                  ),
                                );
                              }
                            }}
                            className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-white text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => {
                              setCart(
                                cart.map((i, idx) =>
                                  idx === index ? { ...i, qty: i.qty + 1 } : i,
                                ),
                              );
                            }}
                            className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center text-white text-sm"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">
                            {(item.prix * item.qty).toFixed(2)} TND
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.prix.toFixed(2)} × {item.qty}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 p-4 space-y-3">
                  {isOverLimit && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 animate-pulse">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div className="text-xs text-red-400">
                        <div className="font-semibold mb-0.5">
                          ⚠️ LIMITE DÉPASSÉE
                        </div>
                        <div>Nouvel encours: {newEncours.toFixed(2)} TND</div>
                        <div>
                          Limite: {selectedClient?.limit.toFixed(2)} TND
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Sous-total HT:</span>
                      <span>{cartSubtotal.toFixed(2)} TND</span>
                    </div>
                    {selectedClient && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Remise ({selectedClient.remise}%):</span>
                        <span>-{discount.toFixed(2)} TND</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-white text-lg pt-2 border-t border-slate-700">
                      <span>Total TTC:</span>
                      <span>{cartTotal.toFixed(2)} TND</span>
                    </div>
                  </div>

                  {deliveryInfo && (
                    <div className="p-2 bg-slate-800/50 rounded text-xs text-slate-400 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-cyan-400" />
                      <span>Livraison: {deliveryInfo.delai}</span>
                    </div>
                  )}

                  <button
                    onClick={validateOrder}
                    disabled={!selectedClient || cart.length === 0}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                      !selectedClient || cart.length === 0
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : isOverLimit
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    {isOverLimit
                      ? "Valider (Limite dépassée)"
                      : "Valider la commande"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
