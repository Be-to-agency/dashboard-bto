import React, { useState } from 'react';
import { Bell, Mail, MessageCircle, Globe, Shield, Eye, Download, Trash2, CheckCircle, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage({ isDarkMode }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    monthlyReport: true,
    newMessages: true,
    performanceAlerts: true,
    marketingEmails: false,
    language: 'fr',
    timezone: 'Europe/Paris',
    dataSharing: false,
    analytics: true
  });
  const [success, setSuccess] = useState('');

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
    setSuccess('Paramètres mis à jour');
    setTimeout(() => setSuccess(''), 2000);
  };

  const handleChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
    setSuccess('Paramètres mis à jour');
    setTimeout(() => setSuccess(''), 2000);
  };

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : (isDarkMode ? 'bg-gray-700' : 'bg-gray-200')
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl shadow-sm p-8 text-white" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>
  <div className="flex items-center gap-3 mb-2">
    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
      <SettingsIcon size={24} className="text-white" />
    </div>
    <h2 className="text-3xl font-bold">Paramètres</h2>
  </div>
  <p className="text-lg opacity-90">Personnalisez votre expérience</p>
</div>

      {/* Message succès */}
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

      {/* Notifications */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Bell size={24} style={{ color: '#0597F2' }} />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Notifications
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications par email
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Recevoir des notifications par email
              </p>
            </div>
            <Toggle 
              enabled={settings.emailNotifications} 
              onClick={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications SMS
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Recevoir des alertes importantes par SMS
              </p>
            </div>
            <Toggle 
              enabled={settings.smsNotifications} 
              onClick={() => handleToggle('smsNotifications')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Nouveaux messages
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Alertes pour les nouveaux messages du support
              </p>
            </div>
            <Toggle 
              enabled={settings.newMessages} 
              onClick={() => handleToggle('newMessages')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Alertes de performance
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Être notifié des changements importants
              </p>
            </div>
            <Toggle 
              enabled={settings.performanceAlerts} 
              onClick={() => handleToggle('performanceAlerts')}
            />
          </div>
        </div>
      </div>

      {/* Rapports */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Download size={24} style={{ color: '#0597F2' }} />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Rapports automatiques
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Rapport hebdomadaire
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Recevoir un résumé chaque lundi
              </p>
            </div>
            <Toggle 
              enabled={settings.weeklyReport} 
              onClick={() => handleToggle('weeklyReport')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Rapport mensuel
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Bilan complet envoyé le 1er du mois
              </p>
            </div>
            <Toggle 
              enabled={settings.monthlyReport} 
              onClick={() => handleToggle('monthlyReport')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Emails marketing
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Nouveautés et offres spéciales
              </p>
            </div>
            <Toggle 
              enabled={settings.marketingEmails} 
              onClick={() => handleToggle('marketingEmails')}
            />
          </div>
        </div>
      </div>

      {/* Préférences */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Globe size={24} style={{ color: '#0597F2' }} />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Préférences régionales
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Langue
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
                isDarkMode 
                  ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                  : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fuseau horaire
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg outline-none transition-all ${
                isDarkMode 
                  ? 'bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500' 
                  : 'bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500'
              }`}
            >
              <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
              <option value="Europe/London">Europe/London (GMT+0)</option>
              <option value="America/New_York">America/New York (GMT-5)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Confidentialité */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Shield size={24} style={{ color: '#0597F2' }} />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Confidentialité et sécurité
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Partage de données
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Autoriser l'utilisation de mes données pour améliorer le service
              </p>
            </div>
            <Toggle 
              enabled={settings.dataSharing} 
              onClick={() => handleToggle('dataSharing')}
            />
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`} />

          <div className="flex items-center justify-between">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Collecter des statistiques d'utilisation anonymes
              </p>
            </div>
            <Toggle 
              enabled={settings.analytics} 
              onClick={() => handleToggle('analytics')}
            />
          </div>
        </div>
      </div>

      {/* Zone de danger */}
      <div className={`${isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-xl shadow-sm border p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <Trash2 size={24} className="text-red-600" />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Zone de danger
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Supprimer mon compte
            </h4>
            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}