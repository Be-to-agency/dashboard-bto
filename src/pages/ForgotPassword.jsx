import React, { useState, useEffect } from 'react';
import { Mail, AlertCircle, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Veuillez entrer votre adresse email');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
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
            Mot de passe oublié ?
          </h1>
          <p className={`transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Pas de souci, nous allons vous aider à le réinitialiser
          </p>
        </div>

        <div className={`rounded-2xl shadow-xl p-8 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          
          {!success ? (
            <>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                        isDarkMode 
                          ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le lien de réinitialisation
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Email envoyé !
              </h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Nous avons envoyé un lien de réinitialisation à<br />
                <span className="font-medium">{email}</span>
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Vérifiez votre boîte de réception (et vos spams)
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className={`text-sm font-medium transition-colors inline-flex items-center gap-2 ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              <ArrowLeft size={16} />
              Retour à la connexion
            </button>
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