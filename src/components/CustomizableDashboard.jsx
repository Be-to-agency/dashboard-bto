import React, { useState } from 'react';
import { GripVertical, X, Eye, EyeOff, Settings, Save, RotateCcw } from 'lucide-react';

export default function CustomizableDashboard({ isDarkMode, children, widgets, onSaveLayout }) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [widgetStates, setWidgetStates] = useState(
    widgets.reduce((acc, widget) => ({
      ...acc,
      [widget.id]: { visible: true, order: widget.order || 0 }
    }), {})
  );

  const toggleWidget = (id) => {
    setWidgetStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        visible: !prev[id].visible
      }
    }));
  };

  const moveWidget = (id, direction) => {
    const currentOrder = widgetStates[id].order;
    const targetOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    
    const otherWidget = Object.entries(widgetStates).find(
      ([_, state]) => state.order === targetOrder
    );

    if (otherWidget) {
      setWidgetStates(prev => ({
        ...prev,
        [id]: { ...prev[id], order: targetOrder },
        [otherWidget[0]]: { ...prev[otherWidget[0]], order: currentOrder }
      }));
    }
  };

  const resetLayout = () => {
    setWidgetStates(
      widgets.reduce((acc, widget) => ({
        ...acc,
        [widget.id]: { visible: true, order: widget.order || 0 }
      }), {})
    );
  };

  const saveLayout = () => {
    onSaveLayout && onSaveLayout(widgetStates);
    setIsCustomizing(false);
    // Simuler sauvegarde
    localStorage.setItem('dashboardLayout', JSON.stringify(widgetStates));
  };

  const sortedWidgets = widgets
    .map(widget => ({
      ...widget,
      ...widgetStates[widget.id]
    }))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {/* Barre d'outils de personnalisation */}
      <div className={`flex items-center justify-between p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <Settings size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isCustomizing ? 'Mode personnalisation' : 'Vue normale'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isCustomizing && (
            <>
              <button
                onClick={resetLayout}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RotateCcw size={16} className="inline mr-2" />
                Réinitialiser
              </button>
              <button
                onClick={saveLayout}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <Save size={16} className="inline mr-2" />
                Sauvegarder
              </button>
            </>
          )}
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isCustomizing 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isCustomizing ? 'Terminer' : 'Personnaliser'}
          </button>
        </div>
      </div>

      {/* Liste des widgets en mode personnalisation */}
      {isCustomizing && (
        <div className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Gérer les widgets
          </h3>
          <div className="space-y-2">
            {sortedWidgets.map((widget, index) => (
              <div
                key={widget.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveWidget(widget.id, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded transition-colors disabled:opacity-30 ${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveWidget(widget.id, 'down')}
                      disabled={index === sortedWidgets.length - 1}
                      className={`p-1 rounded transition-colors disabled:opacity-30 ${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                    >
                      ▼
                    </button>
                  </div>
                  <GripVertical size={20} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {widget.title}
                  </span>
                </div>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    widget.visible
                      ? 'bg-blue-500 text-white'
                      : (isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600')
                  }`}
                >
                  {widget.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Widgets affichés */}
      <div className="space-y-6">
        {sortedWidgets.map(widget => 
          widget.visible && (
            <div 
              key={widget.id}
              className={`relative ${isCustomizing ? 'ring-2 ring-blue-500/50 rounded-xl' : ''}`}
            >
              {isCustomizing && (
                <div className="absolute -top-3 -right-3 z-10">
                  <button
                    onClick={() => toggleWidget(widget.id)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {widget.component}
            </div>
          )
        )}
      </div>
    </div>
  );
}