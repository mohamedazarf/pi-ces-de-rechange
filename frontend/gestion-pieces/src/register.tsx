import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { AlertCircle, UserPlus, ShieldCheck, ArrowRight } from "lucide-react";
import CommercialesNavbar from './components/CommercialesNavbar';
 
const UserRole = {
  User: 0,
  Admin: 1
};
 
function Register() {
  const navigate = useNavigate();
//   const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: UserRole.User,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  // Ton identité visuelle
  const brandBlue = "oklch(60.9% 0.126 221.723)";
  const softBg = "#f8fafc";
 
  const handleChange = (e) => {
    const value = e.target.name === 'role' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
 
    if (formData.password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
 
    setLoading(true);
    try {
    //   await register(formData);
    console.log(formData);
      navigate('/dashboard');
    } catch (err) {
    //   setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    console.log(err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
    <CommercialesNavbar />
    <div className="h-screen flex flex-col font-sans" style={{ backgroundColor: softBg }}>
      <div className="max-w-md mx-auto w-full flex flex-col justify-center h-full px-4">
       
        {/* HEADER SIMPLE */}
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2 text-[9px] font-normal text-gray-400 uppercase tracking-[0.2em] mb-1">
            <span>Authentification</span>
            <span className="text-gray-200">/</span>
            <span style={{ color: brandBlue }}>Nouveau Compte</span>
          </div>
          <h1 className="text-xl font-normal text-gray-800 tracking-tight leading-none">Créer un accès</h1>
        </div>
 
        {error && (
          <div className="bg-red-50 border border-red-100 p-3 flex items-center gap-2 rounded-xl mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            <p className="text-[10px] text-red-700 uppercase tracking-widest font-normal">{error}</p>
          </div>
        )}
 
        {/* CARD STYLE INVOICE LIST */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-50 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.15em] font-normal italic">Protocole de sécurité actif</span>
            </div>
          </div>
 
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">Identifiant</label>
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
              <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">Email Professionnel</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="adresse@domaine.tn"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors"
              />
            </div>
 
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">Mot de passe</label>
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
              <div>
                <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">Confirmation</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 transition-colors"
                />
              </div>
            </div>
 
            <div>
              <label className="text-[9px] font-normal text-gray-400 uppercase tracking-widest mb-2 block">Rôle Système</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-lg text-[12px] font-normal focus:outline-none focus:border-blue-300 cursor-pointer"
              >
                <option value={UserRole.User}>Utilisateur Standard</option>
                <option value={UserRole.Admin}>Administrateur</option>
              </select>
            </div>
 
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: brandBlue }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-white rounded-lg font-normal text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Traitement...' : (
                <>
                  Confirmer l'inscription <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
 
        <div className="mt-6 text-center">
          <Link to="/login" className="text-[9px] font-normal uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors">
            Possédez-vous déjà un compte ? <span style={{ color: brandBlue }} className="font-bold underline underline-offset-4">Se connecter</span>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
 
export default Register;
 