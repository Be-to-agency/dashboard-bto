import React, { useState } from 'react';
import { Menu, X, Home, TrendingUp, Search, MapPin, FileText, HelpCircle, MessageCircle, ShoppingCart, User, Settings } from 'lucide-react';

export default function MobileMenu({ isDarkMode, activeTab, onTabChange, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'gmb', label: 'GMB', icon: MapPin },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'aide', label: 'Aide', icon: HelpCircle },
    { id: 'support', label: 'Support', icon: MessageCircle },
    { id: 'services', label: 'Services', icon: ShoppingCart },
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'parametres', label: 'Paramètres', icon: Settings }
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton hamburger - visible sur mobile uniquement */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden p-2 rounded-lg transition-colors ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        {isOpen ? (
          <X size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
        ) : (
          <Menu size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
        )}
      </button>

      {/* Menu mobile en overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`fixed inset-y-0 left-0 w-80 z-50 lg:hidden transform transition-transform duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Header du menu */}
            <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                    BB
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      BforBiz
                    </h3>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Premium
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : (isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100')
                    }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Footer du menu */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  isDarkMode ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bottom Navigation pour mobile - Alternative */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
      } border-t backdrop-blur-md`}>
        <div className="flex justify-around items-center px-2 py-2">
          {[
            { id: 'accueil', icon: Home },
            { id: 'analytics', icon: TrendingUp },
            { id: 'documents', icon: FileText },
            { id: 'support', icon: MessageCircle },
            { id: 'profil', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-500'
                  : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
              }`}
            >
              <tab.icon size={20} />
              <span className="text-xs font-medium">{tab.id === 'accueil' ? 'Accueil' : tab.id === 'analytics' ? 'Stats' : tab.id === 'documents' ? 'Docs' : tab.id === 'support' ? 'Chat' : 'Profil'}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}