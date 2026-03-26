import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchBCArticles, type BCArticle } from "./services/api";
import CommercialesNavbar from "./components/CommercialesNavbar";

const Articles = () => {
  const [articles, setArticles] = useState<BCArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

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
      setError(
        "Impossible de charger les articles. Vérifiez que le serveur backend est démarré.",
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Array.from(new Set(articles.map(a => a.itemCategoryCode).filter(Boolean))).sort();
  const subCategories = Array.from(new Set(articles
    .filter(a => !selectedCategory || a.itemCategoryCode === selectedCategory)
    .map(a => a.itemSubCategoryCode)
    .filter(Boolean))).sort();

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || art.itemCategoryCode === selectedCategory;
    const matchesSubCategory = !selectedSubCategory || art.itemSubCategoryCode === selectedSubCategory;
    
    const price = art.unitPrice;
    const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);

    return matchesSearch && matchesCategory && matchesSubCategory && matchesMinPrice && matchesMaxPrice;
  });

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-blue-100/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#f8f8f8] p-6 text-[#1f1f1f] border-b border-[#e1e1e1]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-medium mb-1 tracking-tight">
                    Liste des Articles
                  </h1>
                  <p className="text-[#5f5f5f] font-normal">
                    Gérez et consultez votre inventaire en temps réel.
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par désignation ou n°..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 pr-4 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0078D4] transition-all w-full md:w-80"
                  />
                  <svg
                    className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filtres Avancés */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#ededed]">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubCategory(""); // Reset sub-category when category changes
                    }}
                    className="px-3 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 outline-none focus:border-[#0078D4] transition-all text-sm appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a0aec0\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Sous-Catégorie</label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 outline-none focus:border-[#0078D4] transition-all text-sm appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a0aec0\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                  >
                    <option value="">Toutes les sous-catégories</option>
                    {subCategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Prix Minimum</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.00"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="pl-3 pr-8 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0078D4] transition-all w-full text-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">€</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">Prix Maximum</label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="∞"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="pl-3 pr-8 py-2 bg-white border border-[#d0d0d0] rounded-md text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#0078D4] transition-all w-full text-sm"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">€</span>
                  </div>
                  
                  {(searchTerm || selectedCategory || selectedSubCategory || minPrice || maxPrice) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("");
                        setSelectedSubCategory("");
                        setMinPrice("");
                        setMaxPrice("");
                      }}
                      className="absolute -bottom-8 right-0 text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Réinitialiser les filtres
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="p-20 text-center">
                <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-slate-500 font-light">
                  Chargement des articles...
                </p>
              </div>
            ) : error ? (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-slate-800 font-medium mb-2">{error}</p>
                <button
                  onClick={loadArticles}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Réessayer
                </button>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-light">
                Aucun article trouvé.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#e1e1e1]">
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      N° Article
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Désignation
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Type
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Unité
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f] text-right">
                      Prix Unitaire
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Actions
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Catégorie
                    </th>
                    <th className="px-5 py-2.5 text-[11px] uppercase tracking-wider font-semibold text-[#5f5f5f]">
                      Sous-Catégorie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ededed]">
                  {filteredArticles.map((art) => (
                    <motion.tr
                      key={art.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-[#f5f9ff] transition-colors group"
                    >
                      <td className="px-5 py-2.5 text-sm font-mono text-blue-600 font-bold">
                        {art.number}
                      </td>
                      <td className="px-5 py-2.5 text-sm text-slate-800 font-medium">
                        {art.displayName}
                      </td>
                      <td className="px-5 py-2.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            art.type === "Inventory"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {art.type}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-sm text-slate-500">
                        {art.baseUnitOfMeasure}
                      </td>
                      <td className="px-5 py-2.5 text-sm text-slate-800 font-mono text-right font-semibold">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(art.unitPrice)}
                      </td>
                      <td className="px-5 py-2.5">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-blue-100 text-slate-400 hover:text-blue-600 transition-all">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="px-5 py-2.5 text-xs text-slate-500">
                        {art.itemCategoryCode || "—"}
                      </td>
                      <td className="px-5 py-2.5 text-xs text-slate-500 italic">
                        {art.itemSubCategoryCode || "—"}
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
    </>
  );
};

export default Articles;


