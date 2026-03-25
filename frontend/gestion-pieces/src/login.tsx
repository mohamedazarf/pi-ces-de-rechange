// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       console.log("Login attempt:", { email, password, rememberMe });
//     }, 1500);
//   };

//   const fadeIn = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
//       {/* Grid Background Texture */}
//       <div className="fixed inset-0 pointer-events-none opacity-30">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `linear-gradient(rgba(0, 120, 212, 0.03) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(0, 120, 212, 0.03) 1px, transparent 1px)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       {/* Floating Orbs */}
//       <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

//       <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
//         {/* Left Panel - Branding */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-16 rounded-l-2xl relative overflow-hidden"
//         >
//           {/* Decorative Orbs */}
//           <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl" />
//           <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />

//           <div className="relative z-10">
//             {/* Logo */}
//             <div className="flex items-center gap-4 mb-12">
//               <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <div className="w-5 h-5 bg-white rounded-sm transform rotate-45" />
//               </div>
//               <span className="text-2xl font-light text-white tracking-tight">
//                 Business Central
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="text-5xl font-light text-white mb-6 leading-tight tracking-tight">
//               Welcome back to your business command center
//             </h1>

//             <p className="text-lg text-blue-100/80 leading-relaxed font-light mb-12">
//               Access your unified platform for financials, operations, sales,
//               and service management.
//             </p>

//             {/* Features List */}
//             <div className="space-y-4">
//               {[
//                 "Real-time financial insights",
//                 "Streamlined operations",
//                 "Enhanced customer relationships",
//                 "Data-driven decisions",
//               ].map((feature, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
//                   className="flex items-center gap-3"
//                 >
//                   <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
//                     <svg
//                       className="w-4 h-4 stroke-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                     >
//                       <polyline points="20 6 9 17 4 12" />
//                     </svg>
//                   </div>
//                   <span className="text-blue-50/90 font-light">{feature}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Panel - Login Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="bg-white p-12 lg:p-16 rounded-2xl lg:rounded-l-none shadow-2xl"
//         >
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
//               <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
//             </div>
//             <span className="text-xl font-light text-slate-800 tracking-tight">
//               Business Central
//             </span>
//           </div>

//           {/* Form Header */}
//           <motion.div {...fadeIn} className="mb-10">
//             <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-3 tracking-tight">
//               Sign in
//             </h2>
//             <p className="text-slate-600 font-light">
//               Enter your credentials to access your account
//             </p>
//           </motion.div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-slate-700 mb-2"
//               >
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50/50 hover:bg-white"
//                 placeholder="you@company.com"
//                 required
//               />
//             </motion.div>

//             {/* Password Field */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-slate-700 mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50/50 hover:bg-white"
//                 placeholder="••••••••"
//                 required
//               />
//             </motion.div>

//             {/* Remember Me & Forgot Password */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="flex items-center justify-between"
//             >
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
//                 />
//                 <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors font-light">
//                   Remember me
//                 </span>
//               </label>
//               <a
//                 href="#"
//                 className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
//               >
//                 Forgot password?
//               </a>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                       fill="none"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign in"
//               )}
//             </motion.button>

//             {/* Divider */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//               className="relative my-8"
//             >
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-slate-500 font-light">
//                   Or continue with
//                 </span>
//               </div>
//             </motion.div>

//             {/* SSO Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.7 }}
//               className="grid grid-cols-2 gap-4"
//             >
//               <button
//                 type="button"
//                 className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group"
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path
//                     fill="#4285F4"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="#EA4335"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
//                   Google
//                 </span>
//               </button>

//               <button
//                 type="button"
//                 className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group"
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00A4EF">
//                   <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
//                 </svg>
//                 <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
//                   Microsoft
//                 </span>
//               </button>
//             </motion.div>
//           </form>

//           {/* Sign Up Link */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="mt-8 text-center text-sm text-slate-600 font-light"
//           >
//             Don't have an account?{" "}
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
//             >
//               Request a demo
//             </a>
//           </motion.p>

//           {/* Terms */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.9 }}
//             className="mt-6 text-center text-xs text-slate-500 font-light"
//           >
//             By signing in, you agree to our{" "}
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-700 transition-colors"
//             >
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a
//               href="#"
//               className="text-blue-600 hover:text-blue-700 transition-colors"
//             >
//               Privacy Policy
//             </a>
//           </motion.p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { AlertCircle, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import CommercialesNavbar from "./components/CommercialesNavbar";

const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Ton identité visuelle (Identique à InvoiceList)
  const brandBlue = "oklch(60.9% 0.126 221.723)";
  const softBg = "#f8fafc";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // await login(formData);
      console.log(formData);
      navigate("/dashboard");
    } catch (err) {
      // Traduction et affichage de l'erreur
      // setError(err.response?.data?.message || "Identifiants invalides.");
      console.log(err);
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
          {/* HEADER STYLE REGISTRE - AJUSTÉ POUR COMPENSER L'ABSENCE DE LOGO */}
          <div className="mb-8 px-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[9px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-1">
              <span>Sécurité</span>
              <span className="text-gray-200">/</span>
              <span style={{ color: brandBlue }}>Accès Portail</span>
            </div>
            <h1 className="text-xl font-normal text-gray-800 tracking-tight leading-none">
              Connexion au Registre
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

          {/* CARD STYLE INVOICE LIST */}
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

            <form onSubmit={handleSubmit} className="p-8 space-y-5 flex-1">
              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">
                  Identifiant
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Nom d'utilisateur"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors"
                />
              </div>

              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">
                  Mot de passe
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

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: brandBlue }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-white rounded-lg font-normal text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                    <span>Vérification...</span>
                  </div>
                ) : (
                  <>
                    Se connecter <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center flex-none">
            <p className="text-[9px] font-normal uppercase tracking-widest text-gray-400">
              Nouveau sur la plateforme ?{" "}
              <Link
                to="/register"
                style={{ color: brandBlue }}
                className="font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          {/* FOOTER DISCRET - Identique à InvoiceList */}
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
