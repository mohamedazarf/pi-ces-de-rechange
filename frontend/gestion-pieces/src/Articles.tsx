import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchBCArticles, type BCArticle } from "./services/api";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState<BCArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBCArticles();
      setArticles(data);
    } catch (err: any) {
      setError("Impossible de charger les articles. Vérifiez que le serveur backend est démarré.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = articles.filter(art => 
    art.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.number.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-blue-100/50"
      >
        <div className="max-w-[1600px] mx-auto px-12 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-110">
              <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
            </div>
            <span className="text-xl font-light text-slate-800 tracking-tight">
              Business Central <span className="text-blue-600 font-medium">/ Articles</span>
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/clients" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Clients</Link>
            <Link to="/commerciales" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Commerciales</Link>
            <Link to="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">Accueil</Link>
          </div>
        </div>
      </motion.nav>

      <main className="flex-1 pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-light mb-2 tracking-tight">Liste des Articles</h1>
                <p className="text-blue-100 font-light opacity-80">Gérez et consultez votre inventaire en temps réel.</p>
              </div>
              
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-100/50 outline-none focus:bg-white/20 transition-all w-full md:w-64"
                />
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="p-20 text-center">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-slate-500 font-light">Chargement des articles...</p>
              </div>
            ) : error ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-slate-800 font-medium mb-2">{error}</p>
                <button onClick={loadArticles} className="text-blue-600 hover:underline text-sm">Réessayer</button>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-light">
                Aucun article trouvé.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500">N° Article</th>
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500">Désignation</th>
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500">Type</th>
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500">Unité</th>
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500 text-right">Prix Unitaire</th>
                    <th className="px-8 py-4 text-xs uppercase tracking-wider font-semibold text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredArticles.map((art) => (
                    <motion.tr 
                      key={art.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-8 py-5 text-sm font-mono text-blue-600 font-bold">{art.number}</td>
                      <td className="px-8 py-5 text-sm text-slate-800 font-medium">{art.displayName}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          art.type === 'Inventory' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {art.type}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500">{art.baseUnitOfMeasure}</td>
                      <td className="px-8 py-5 text-sm text-slate-800 font-mono text-right font-semibold">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(art.unitPrice)}
                      </td>
                      <td className="px-8 py-5">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-blue-100 text-slate-400 hover:text-blue-600 transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <footer className="py-8 text-center text-slate-400 text-xs font-light tracking-widest uppercase">
        Dynamics 365 Business Central | Article Management System
      </footer>
    </div>
  );
};

export default Articles;
