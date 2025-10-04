import React, { useState } from 'react';
import { Sun, Moon, Monitor, Check, Palette } from 'lucide-react';

export default function ThemeSelector({ isDarkMode, themeMode, onThemeChange, currentColor, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: 'light', label: 'Clair', icon: Sun },
    { id: 'dark', label: 'Sombre', icon: Moon },
    { id: 'auto', label: 'Auto', icon: Monitor }
  ];

  const colors = [
    { id: 'blue', name: 'Bleu', primary: '#0597F2', secondary: '#0476C5' },
    { id: 'green', name: 'Vert', primary: '#10b981', secondary: '#059669' },
    { id: 'purple', name: 'Violet', primary: '#8b5cf6', secondary: '#7c3aed' },
    { id: 'orange', name: 'Orange', primary: '#f59e0b', secondary: '#d97706' },
    { id: 'pink', name: 'Rose', primary: '#ec4899', secondary: '#db2777' },
    { id: 'red', name: 'Rouge', primary: '#ef4444', secondary: '#dc2626' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
        title="Personnaliser le thème"
      >
        <Palette size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 top-12 w-72 rounded-xl shadow-2xl border z-50 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Personnaliser l'apparence
              </h3>
            </div>

            <div className="p-4 space-y-6">
              {/* Mode de thème */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Mode d'affichage
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {modes.map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => onThemeChange(mode.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        themeMode === mode.id
                          ? 'border-blue-500'
                          : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                      }`}
                    >
                      <mode.icon 
                        size={20} 
                        className={`mx-auto mb-1 ${
                          themeMode === mode.id 
                            ? 'text-blue-500' 
                            : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                        }`}
                      />
                      <p className={`text-xs font-medium ${
                        themeMode === mode.id 
                          ? 'text-blue-500' 
                          : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                      }`}>
                        {mode.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleur d'accentuation */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Couleur d'accentuation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => onColorChange(color)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentColor.id === color.id
                          ? 'border-gray-400'
                          : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full mx-auto mb-1"
                        style={{ background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})` }}
                      >
                        {currentColor.id === color.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {color.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Les changements sont sauvegardés automatiquement
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}