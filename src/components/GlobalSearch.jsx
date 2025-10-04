import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, FileText, MessageCircle, Star, MapPin, User, ShoppingCart, HelpCircle, Settings } from 'lucide-react';

export default function GlobalSearch({ isDarkMode, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const allContent = [
    { id: 1, title: 'Accueil', type: 'Page', tab: 'accueil', icon: User, color: '#0597F2' },
    { id: 2, title: 'Analytics', type: 'Page', tab: 'analytics', icon: TrendingUp, color: '#10b981' },
    { id: 3, title: 'SEO', type: 'Page', tab: 'seo', icon: Search, color: '#10b981' },
    { id: 4, title: 'Google My Business', type: 'Page', tab: 'gmb', icon: MapPin, color: '#f59e0b' },
    { id: 5, title: 'Documents', type: 'Page', tab: 'documents', icon: FileText, color: '#0597F2' },
    { id: 6, title: 'Aide', type: 'Page', tab: 'aide', icon: HelpCircle, color: '#0597F2' },
    { id: 7, title: 'Support', type: 'Page', tab: 'support', icon: MessageCircle, color: '#0597F2' },
    { id: 8, title: 'Services', type: 'Page', tab: 'services', icon: ShoppingCart, color: '#0597F2' },
    { id: 9, title: 'Profil', type: 'Page', tab: 'profil', icon: User, color: '#0597F2' },
    { id: 10, title: 'Paramètres', type: 'Page', tab: 'parametres', icon: Settings, color: '#0597F2' },
    { id: 11, title: 'Rapport Analytics Septembre', type: 'Document', tab: 'documents', icon: FileText, color: '#0597F2' },
    { id: 12, title: 'Position SEO moyenne', type: 'Statistique', tab: 'seo', icon: TrendingUp, color: '#10b981' },
    { id: 13, title: 'Avis Google My Business', type: 'Avis', tab: 'gmb', icon: Star, color: '#f59e0b' },
    { id: 14, title: 'Contacter le support', type: 'Action', tab: 'support', icon: MessageCircle, color: '#0597F2' },
    { id: 15, title: 'Visiteurs uniques', type: 'Statistique', tab: 'analytics', icon: TrendingUp, color: '#10b981' },
    { id: 16, title: 'Factures', type: 'Document', tab: 'documents', icon: FileText, color: '#0597F2' },
    { id: 17, title: 'Chef de projet', type: 'Contact', tab: 'accueil', icon: User, color: '#0597F2' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = allContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleSelect = (item) => {
    if (onNavigate) {
      onNavigate(item.tab);
    }
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 16px',
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#e5e7eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#1f2937' : '#f3f4f6'}
      >
        <Search size={18} />
        <span style={{ fontSize: '14px' }}>Rechercher dans le dashboard...</span>
      </button>
    );
  }

  return (
    <>
      <div 
        onClick={() => { 
          setIsOpen(false); 
          setQuery(''); 
          setResults([]);
        }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 50
        }}
      />
      
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '672px',
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}>
          {/* Barre de recherche */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            borderBottom: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb'
          }}>
            <Search size={20} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              autoFocus
              style={{
                flex: 1,
                fontSize: '18px',
                fontWeight: 500,
                color: isDarkMode ? '#ffffff' : '#111827',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                caretColor: isDarkMode ? '#ffffff' : '#111827'
              }}
            />
            <button
              onClick={() => { 
                setIsOpen(false); 
                setQuery(''); 
                setResults([]);
              }}
              style={{
                padding: '4px',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={20} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
            </button>
          </div>

          {/* Résultats */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '8px'
          }}>
            {query === '' ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>
                <Search size={48} color={isDarkMode ? '#4b5563' : '#d1d5db'} style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>Commencez à taper pour rechercher</p>
                <p style={{ fontSize: '12px' }}>Documents, pages, statistiques...</p>
              </div>
            ) : results.length === 0 ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>
                <p style={{ fontSize: '14px' }}>Aucun résultat pour "{query}"</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {results.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: `${item.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={20} color={item.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: isDarkMode ? '#ffffff' : '#111827',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: '2px'
                        }}>
                          {item.title}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: isDarkMode ? '#9ca3af' : '#6b7280'
                        }}>
                          {item.type}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '12px 16px',
            borderTop: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            fontSize: '12px',
            color: isDarkMode ? '#6b7280' : '#9ca3af'
          }}>
            Appuyez sur ESC pour fermer
          </div>
        </div>
      </div>
    </>
  );
}