import React, { useState } from 'react';
import { Calendar, ChevronDown, X } from 'lucide-react';

export default function DateFilter({ isDarkMode, onDateChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const periods = [
    { id: '7days', label: '7 derniers jours' },
    { id: '30days', label: '30 derniers jours' },
    { id: 'thisMonth', label: 'Ce mois' },
    { id: 'lastMonth', label: 'Mois dernier' },
    { id: '3months', label: '3 derniers mois' },
    { id: '6months', label: '6 derniers mois' },
    { id: 'thisYear', label: 'Cette année' },
    { id: 'custom', label: 'Période personnalisée' }
  ];

  const handlePeriodChange = (periodId) => {
    setSelectedPeriod(periodId);
    setShowCustom(periodId === 'custom');
    
    if (periodId !== 'custom') {
      const dates = calculateDates(periodId);
      onDateChange && onDateChange(dates);
      setIsOpen(false);
    }
  };

  const calculateDates = (periodId) => {
    const today = new Date();
    let start, end = today;

    switch(periodId) {
      case '7days':
        start = new Date(today);
        start.setDate(start.getDate() - 7);
        break;
      case '30days':
        start = new Date(today);
        start.setDate(start.getDate() - 30);
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case '3months':
        start = new Date(today);
        start.setMonth(start.getMonth() - 3);
        break;
      case '6months':
        start = new Date(today);
        start.setMonth(start.getMonth() - 6);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        start = today;
    }

    return { start, end };
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onDateChange && onDateChange({
        start: new Date(customStart),
        end: new Date(customEnd)
      });
      setIsOpen(false);
    }
  };

  const getCurrentLabel = () => {
    const period = periods.find(p => p.id === selectedPeriod);
    if (selectedPeriod === 'custom' && customStart && customEnd) {
      return `${new Date(customStart).toLocaleDateString('fr-FR')} - ${new Date(customEnd).toLocaleDateString('fr-FR')}`;
    }
    return period?.label || '3 derniers mois';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode ? 'text-gray-300 hover:bg-gray-800 border border-gray-700' : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <Calendar size={18} />
        <span className="text-sm">{getCurrentLabel()}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 top-12 w-80 rounded-xl shadow-2xl border z-50 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sélectionner une période
              </h3>
            </div>

            <div className="p-2">
              {periods.map(period => (
                <button
                  key={period.id}
                  onClick={() => handlePeriodChange(period.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-blue-500 text-white'
                      : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50')
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {showCustom && (
              <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-900 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleCustomApply}
                    disabled={!customStart || !customEnd}
                    className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
