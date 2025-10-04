import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, User, Building, Phone } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.companyName || !formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email,
        name: formData.fullName,
        company: formData.companyName 
      }));
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      
      <div className="w-full max-w-2xl">
        
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="/logo-beto.png" 
              alt="Be-to Logo" 
              className="h-24 mx-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className={`hidden items-center justify-center h-24 w-48 mx-auto rounded-xl border-2 border-dashed transition-colors ${
                isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Votre logo ici
                </p>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  (logo-beto.png)
                </p>
              </div>
            </div>
          </div>
          
          <h1 className={`text-3xl font-bold mb-2 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Créer votre compte Be-to
          </h1>
          <p className={`transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Commencez à suivre vos performances dès maintenant
          </p>
        </div>

        <div className={`rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          
          {error && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              isDarkMode 
                ? 'bg-red-900/30 border border-red-800' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                {error}
              </p>
            </div>
          )}

          <div className="space-y-5">
            
            {/* Nom entreprise */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nom de l'entreprise *
              </label>
              <div className="relative">
                <Building className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} size={20} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Be-to Agency"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Nom complet */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nom complet *
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Email et Téléphone sur 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Adresse email *
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.fr"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Téléphone (optionnel)
                </label>
                <div className="relative">
                  <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Mot de passe et confirmation sur 2 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mot de passe */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 rounded-lg outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-500 hover:text-gray-300' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Minimum 6 caractères
                </p>
              </div>

              {/* Confirmation mot de passe */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 rounded-lg outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-500 hover:text-gray-300' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                J'accepte les{' '}
                <button className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                  conditions d'utilisation
                </button>
                {' '}et la{' '}
                <button className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                  politique de confidentialité
                </button>
              </label>
            </div>

            {/* Bouton d'inscription */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Création du compte...
                </>
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${
                isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-white text-gray-500'
              }`}>
                ou
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Vous avez déjà un compte ?{' '}
              <button 
                onClick={() => window.location.href = '/login'}
                className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className={`text-sm transition-colors ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            © 2025 Be-to - Agence web & SEO
          </p>
        </div>
      </div>
    </div>
  );
}