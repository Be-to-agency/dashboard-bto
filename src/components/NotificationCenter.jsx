import React, { useState } from 'react';
import { Bell, X, Check, TrendingUp, MessageCircle, FileText, AlertCircle } from 'lucide-react';

export default function NotificationCenter({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'performance',
      title: 'Augmentation du trafic',
      message: 'Votre trafic a augmenté de 12% cette semaine',
      time: 'Il y a 2h',
      read: false,
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      message: 'Thomas Léon vous a envoyé un message',
      time: 'Il y a 5h',
      read: false,
      icon: MessageCircle,
      color: '#0597F2'
    },
    {
      id: 3,
      type: 'document',
      title: 'Nouveau rapport disponible',
      message: 'Rapport SEO - Septembre 2025',
      time: 'Hier',
      read: true,
      icon: FileText,
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Position SEO en baisse',
      message: 'Le mot-clé "agence web" a perdu 2 positions',
      time: 'Il y a 2 jours',
      read: true,
      icon: AlertCircle,
      color: '#ef4444'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Bouton Bell avec badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-lg transition-colors ${
          isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        }`}
      >
        <Bell size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel des notifications */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 top-12 w-96 rounded-xl shadow-2xl border z-50 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            {/* Header */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Notifications ({unreadCount})
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {/* Liste des notifications */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Aucune notification
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b transition-colors ${
                      isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                    } ${!notif.read ? (isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50/50') : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${notif.color}20` }}
                      >
                        <notif.icon size={20} style={{ color: notif.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {notif.title}
                          </h4>
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className={`flex-shrink-0 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {notif.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {notif.time}
                          </span>
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
                            >
                              <Check size={12} />
                              Marquer comme lu
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className={`p-3 border-t text-center ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button className="text-sm font-medium text-blue-500 hover:text-blue-600">
                  Voir toutes les notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}