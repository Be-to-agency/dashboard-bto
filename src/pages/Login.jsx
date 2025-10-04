import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify({ email: formData.email }));
      // Redirection vers le dashboard
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      
      <div className="w-full max-w-md">
        
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
            Espace Client B-to
          </h1>
          <p className={`transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Connectez-vous pour accéder à votre tableau de bord
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
            
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Adresse email
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

            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Mot de passe
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
            </div>

            <div className="flex items-center justify-between">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    />
    <span className={`text-sm transition-colors ${
      isDarkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>
      Se souvenir de moi
    </span>
  </label>
  <button 
  onClick={() => window.location.href = '/forgot-password'}
  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
>
  Mot de passe oublié ?
</button>
</div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
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
              Vous n'avez pas de compte ?{' '}
              <button className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                Créer un compte
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
          <div className="flex items-center justify-center gap-4 mt-3">
            <button className={`text-xs transition-colors ${
              isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              Conditions d'utilisation
            </button>
            <span className={isDarkMode ? 'text-gray-700' : 'text-gray-300'}>•</span>
            <button className={`text-xs transition-colors ${
              isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}