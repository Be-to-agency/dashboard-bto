import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Lock, Camera, Save, AlertCircle, CheckCircle } from 'lucide-react';

export default function ProfilePage({ isDarkMode, onBack }) {
  const [formData, setFormData] = useState({
    companyName: 'NIECHCICKI-AVOCATS',
    fullName: 'MAITRE CAROLE NIECHCICKI',
    email: 'contact@niechcicki-avocats.fr',
    phone: '+33 1 23 45 67 89',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSaveProfile = () => {
    setError('');
    setSuccess('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess('Profil mis à jour avec succès !');
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.fullName,
        company: formData.companyName
      }));
    }, 1000);
  };

  const handleChangePassword = () => {
    setError('');
    setSuccess('');

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs du mot de passe');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Mot de passe modifié avec succès !');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl shadow-sm p-8 text-white" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>
  <div className="flex items-center gap-3 mb-2">
    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
      <User size={24} className="text-white" />
    </div>
    <h2 className="text-3xl font-bold">Mon Profil</h2>
  </div>
  <p className="text-lg opacity-90">Gérez vos informations personnelles</p>
</div>

      {/* Messages */}
      {error && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          isDarkMode 
            ? 'bg-red-900/30 border border-red-800' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{error}</p>
        </div>
      )}

      {success && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          isDarkMode 
            ? 'bg-green-900/30 border border-green-800' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
          <p className={`text-sm ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{success}</p>
        </div>
      )}

      {/* Avatar et infos générales */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Photo de profil
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>
              CN
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formData.companyName}</h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>B-to Rise</p>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-600 mt-2">
              Changer la photo
            </button>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nom de l'entreprise
            </label>
            <div className="relative">
              <Building className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nom complet
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Téléphone
            </label>
            <div className="relative">
              <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="mt-6 px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
          style={{ backgroundColor: '#0597F2' }}
        >
          <Save size={18} />
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </div>

      {/* Changer le mot de passe */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Changer le mot de passe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Mot de passe actuel
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nouveau mot de passe
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-4 py-3 rounded-lg outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500' 
                    : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                }`}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="mt-6 px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
          style={{ backgroundColor: '#0597F2' }}
        >
          <Lock size={18} />
          {loading ? 'Modification...' : 'Modifier le mot de passe'}
        </button>
      </div>
    </div>
  );
}