import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, MousePointer, Eye, Search, ArrowUp, ArrowDown, Calendar, Download, Moon, Sun, Star, MapPin, Phone, MessageCircle, Send, Paperclip, Clock, ShoppingCart, Check, Zap, LogOut, Home, User, Mail, CheckCircle, HelpCircle, FileText, HeadphonesIcon, Settings as SettingsIcon } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotificationCenter from './components/NotificationCenter';
import DateFilter from './components/DateFilter';
import ExportPDF from './components/ExportPDF';
import GlobalSearch from './components/GlobalSearch';
import PDFViewer from './components/PDFViewer';
import MobileMenu from './components/MobileMenu';
import { FadeIn, SlideIn } from './components/SkeletonLoader';

// Composant Header de page unifié
const PageHeader = ({ icon: Icon, title, subtitle, gradientFrom = '#0597F2', gradientTo = '#0476C5' }) => (
  <div className="rounded-xl shadow-lg p-10 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`, minHeight: '180px' }}>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Icon size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-lg opacity-90 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  </div>
);

// Composant Dashboard
const Dashboard = () => {
  const [pdfViewer, setPdfViewer] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('accueil');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'agency', text: 'Bonjour ! Comment pouvons-nous vous aider ?', time: '10:30' },
    { id: 2, from: 'client', text: 'J\'aimerais des infos sur le SEO', time: '10:32' },
  ]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const trafficData = [
    { mois: 'Avr', visiteurs: 2400, pages: 4200 },
    { mois: 'Mai', visiteurs: 3200, pages: 5100 },
    { mois: 'Juin', visiteurs: 2800, pages: 4800 },
    { mois: 'Juil', visiteurs: 3900, pages: 6200 },
    { mois: 'Août', visiteurs: 4200, pages: 6800 },
    { mois: 'Sept', visiteurs: 4800, pages: 7400 },
  ];

  const sourcesData = [
    { name: 'Recherche organique', value: 45, color: '#0597F2' },
    { name: 'Direct', value: 25, color: '#0476C5' },
    { name: 'Réseaux sociaux', value: 20, color: '#3AAFFF' },
    { name: 'Référents', value: 10, color: '#6BC5FF' },
  ];

  const seoData = [
    { mot_cle: 'agence web paris', position: 3, clics: 245, impressions: 3200, evolution: 'up' },
    { mot_cle: 'création site internet', position: 7, clics: 189, impressions: 2800, evolution: 'up' },
    { mot_cle: 'seo france', position: 12, clics: 134, impressions: 1900, evolution: 'down' },
    { mot_cle: 'développement web', position: 5, clics: 298, impressions: 3500, evolution: 'up' },
  ];

  const gmbReviews = [
    { author: 'Sophie M.', rating: 5, date: '2 jours', text: 'Excellente agence !' },
    { author: 'Pierre L.', rating: 5, date: '5 jours', text: 'Site magnifique et rapide.' },
    { author: 'Marie D.', rating: 4, date: '1 semaine', text: 'Bon travail dans l\'ensemble.' },
  ];

  const services = [
    { id: 1, name: 'Audit SEO Complet', price: '890€', category: 'SEO', popular: false },
    { id: 2, name: 'Pack Optimisation SEO', price: '450€/mois', category: 'SEO', popular: true },
    { id: 3, name: 'Refonte Graphique', price: 'À partir de 999€', category: 'Design', popular: false },
    { id: 4, name: 'Campagne Google Ads', price: 'À partir de 890€', category: 'Marketing', popular: true },
    { id: 5, name: 'Prestations de conseil', price: 'À partir de 1499€/mois', category: 'Consulting', popular: true },
    { id: 6, name: 'Création de contenu', price: '350€/mois', category: 'Marketing', popular: false },
  ];

  const StatCard = ({ title, value, change, icon: Icon, positive, chartData }) => (
    <div className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, #0597F2, #0476C5)` }}>
            <Icon style={{ color: '#ffffff' }} size={20} />
          </div>
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</span>
        </div>
      </div>
      <div className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</div>
      {chartData && (
        <div className="mb-3">
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0597F2" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0597F2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#0597F2" strokeWidth={2} fill="#0597F2" fillOpacity={0.2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="flex items-center text-sm font-medium" style={{ color: positive ? '#10b981' : '#ef4444' }}>
        {positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="ml-1">{change}</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <header className={`sticky top-0 z-10 backdrop-blur-md ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } border-b shadow-sm`}>
        <div className="max-w-[1800px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            
            <MobileMenu 
              isDarkMode={isDarkMode}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLogout={handleLogout}
            />
            
            <div className="flex items-center gap-4 min-w-fit">
              <img 
                src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} 
                alt="Logo Be-to" 
                className="h-12 w-auto object-contain" 
              />
              <div className="hidden lg:block">
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  BBoard
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  BforBiz SAS
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-3xl mx-8">
              <GlobalSearch 
                isDarkMode={isDarkMode} 
                onNavigate={(tab) => setActiveTab(tab)} 
              />
            </div>

            <div className="flex items-center gap-4 min-w-fit">
              <NotificationCenter isDarkMode={isDarkMode} />
              
              <div className={`w-px h-8 mx-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              
              <div className="flex items-center gap-3">
                <div className="hidden xl:block text-right">
                  <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    BforBiz
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                  BB
                </div>
                <button 
                  onClick={handleLogout}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                  title="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className={`hidden lg:block sticky top-[73px] z-10 backdrop-blur-md ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'
      } border-b`}>
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'accueil', label: 'Accueil', icon: Home },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'seo', label: 'SEO', icon: Search },
              { id: 'gmb', label: 'GMB', icon: MapPin },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'aide', label: 'Aide', icon: HelpCircle },
              { id: 'support', label: 'Support', icon: MessageCircle },
              { id: 'services', label: 'Services', icon: ShoppingCart },
              { id: 'profil', label: 'Profil', icon: User },
              { id: 'parametres', label: 'Paramètres', icon: SettingsIcon }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600')
                    : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900')
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-8 pb-20 lg:pb-8">
        {activeTab === 'accueil' && (
          <div className="space-y-8">
            <PageHeader 
              icon={Home} 
              title="Bienvenue, BforBiz !" 
              subtitle="Voici un aperçu de vos performances ce mois-ci" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                    <User size={20} className="text-white" />
                  </div>
                  Mon Profil
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>
                      BB
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>BforBiz SAS</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Mail size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>contact@bforbiz.com</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle size={18} style={{ color: '#10b981' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Compte vérifié</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Client depuis Mars 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                    <User size={20} className="text-white" />
                  </div>
                  Votre Chef de Projet
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>
                      TL
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Thomas Léon</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chef de Projet Web & SEO</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Mail size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>thomas@b-to.io</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Phone size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>01 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Disponible maintenant</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('support')}
                    className="w-full mt-4 py-3 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}
                  >
                    <MessageCircle size={18} className="inline mr-2" />
                    Envoyer un message
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                  <TrendingUp size={24} className="text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Vos performances ce mois-ci
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Visiteurs" value="4,832" change="+12.5%" icon={Users} positive={true} chartData={[{value:3800},{value:4100},{value:3900},{value:4300},{value:4500},{value:4832}]} />
                <StatCard title="Position SEO" value="8.4" change="+2.1" icon={Search} positive={true} chartData={[{value:10.2},{value:9.8},{value:9.5},{value:9.0},{value:8.7},{value:8.4}]} />
                <StatCard title="Avis GMB" value="4.8" change="+0.2" icon={Star} positive={true} chartData={[{value:4.5},{value:4.6},{value:4.6},{value:4.7},{value:4.7},{value:4.8}]} />
                <StatCard title="Taux rebond" value="42.8%" change="-3.2%" icon={MousePointer} positive={true} chartData={[{value:48},{value:46},{value:47},{value:45},{value:44},{value:42.8}]} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-8">
            <PageHeader 
              icon={FileText} 
              title="Vos Documents" 
              subtitle="Accédez à tous vos rapports, factures et contrats" 
            />

            <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg font-medium text-white shadow-md transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                  Tous les documents
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Rapports SEO
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Factures
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Contrats
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  Autres
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { name: 'Rapport SEO - Septembre 2025', type: 'Rapport', date: '30 Sept 2025', size: '2.4 MB', color: '#0597F2' },
                { name: 'Facture #2025-09', type: 'Facture', date: '28 Sept 2025', size: '156 KB', color: '#10b981' },
                { name: 'Analytics - Août 2025', type: 'Rapport', date: '31 Août 2025', size: '3.1 MB', color: '#0597F2' },
                { name: 'Contrat de prestation', type: 'Contrat', date: '15 Mars 2024', size: '890 KB', color: '#f59e0b' },
                { name: 'Audit technique complet', type: 'Rapport', date: '20 Août 2025', size: '4.8 MB', color: '#0597F2' },
                { name: 'Facture #2025-08', type: 'Facture', date: '28 Août 2025', size: '156 KB', color: '#10b981' },
              ].map((doc, i) => (
                <div key={i} className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${doc.color}, ${doc.color}dd)` }}>
                        <FileText size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{doc.name}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{doc.type}</span>
                          <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{doc.size}</span>
                        </div>
                        <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {doc.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 px-4 rounded-lg font-medium text-white transition-all hover:scale-105 shadow-md" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                      <Download size={16} className="inline mr-2" />
                      Télécharger
                    </button>
                    <button className={`py-2.5 px-4 rounded-lg font-medium transition-all hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'aide' && (
          <div className="space-y-8">
            <PageHeader 
              icon={HelpCircle} 
              title="Centre d'aide" 
              subtitle="Trouvez rapidement des réponses à vos questions" 
            />

            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Questions fréquentes
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    q: 'Comment interpréter mes statistiques Analytics ?',
                    a: 'Vos statistiques Analytics vous donnent un aperçu du trafic de votre site. Les visiteurs représentent le nombre de personnes uniques, les pages vues le nombre total de pages consultées, et le taux de rebond le pourcentage de visiteurs qui quittent après avoir vu une seule page.'
                  },
                  {
                    q: 'Que signifie ma position SEO moyenne ?',
                    a: 'La position SEO moyenne représente la place moyenne de votre site dans les résultats de recherche Google pour vos mots-clés ciblés. Une position de 8.4 signifie que votre site apparaît en moyenne en 8ème ou 9ème position. L\'objectif est de se rapprocher de la position 1.'
                  },
                  {
                    q: 'Comment améliorer ma note Google My Business ?',
                    a: 'Pour améliorer votre note GMB : encouragez vos clients satisfaits à laisser des avis, répondez rapidement et professionnellement à tous les avis (positifs et négatifs), mettez régulièrement à jour vos informations et photos, et utilisez les posts GMB pour rester actif.'
                  },
                  {
                    q: 'À quelle fréquence mes données sont-elles mises à jour ?',
                    a: 'Vos données sont synchronisées quotidiennement avec Google Analytics, Search Console et Google My Business. Les mises à jour ont généralement lieu la nuit pour refléter les données de la veille.'
                  },
                  {
                    q: 'Comment exporter mes rapports ?',
                    a: 'Cliquez sur le bouton "Exporter" en haut à droite de chaque page. Vous pouvez exporter vos données au format PDF ou Excel selon vos besoins.'
                  },
                  {
                    q: 'Qui est mon chef de projet et comment le contacter ?',
                    a: 'Thomas Léon est votre chef de projet dédié. Vous pouvez le contacter par email à thomas@b-to.io, par téléphone au 01 23 45 67 89, ou via la messagerie intégrée dans l\'onglet "Service Client".'
                  }
                ].map((faq, i) => (
                  <details key={i} className={`group rounded-xl border transition-all ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                      : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                  }`}>
                    <summary className={`cursor-pointer font-semibold p-6 flex items-center justify-between ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <span className="flex-1 pr-4">{faq.q}</span>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-open:rotate-180" style={{ backgroundColor: '#0597F220' }}>
                        <ArrowDown size={18} style={{ color: '#0597F2' }} />
                      </div>
                    </summary>
                    <div className={`px-6 pb-6 pt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className="leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                  <Eye size={24} className="text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tutoriels vidéo
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Comprendre votre tableau de bord', duration: '5:30', color: '#0597F2' },
                  { title: 'Interpréter vos stats SEO', duration: '8:15', color: '#10b981' },
                  { title: 'Utiliser la messagerie', duration: '3:45', color: '#f59e0b' },
                  { title: 'Exporter vos rapports', duration: '4:20', color: '#8b5cf6' },
                  { title: 'Optimiser votre GMB', duration: '10:05', color: '#ef4444' },
                  { title: 'Commander des services', duration: '6:40', color: '#0597F2' }
                ].map((video, i) => (
                  <div key={i} className={`rounded-xl border overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                      : 'bg-white border-gray-200 hover:border-blue-400'
                  }`}>
                    <div className="relative" style={{ backgroundColor: `${video.color}15` }}>
                      <div className="aspect-video flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: video.color }}>
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {video.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border p-10 text-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
            }`}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                <HeadphonesIcon size={40} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Vous ne trouvez pas votre réponse ?
              </h3>
              <p className={`mb-8 text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Notre équipe support est là pour vous aider
              </p>
              <button 
                onClick={() => setActiveTab('support')}
                className="px-8 py-4 rounded-xl font-semibold text-white inline-flex items-center gap-3 transition-all hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}
              >
                <MessageCircle size={20} />
                Contacter le support
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <PageHeader 
              icon={TrendingUp} 
              title="Google Analytics" 
              subtitle="Analysez le trafic de votre site web" 
              gradientFrom="#10b981" 
              gradientTo="#059669" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Visiteurs" value="4,832" change="+12.5%" icon={Users} positive={true} chartData={[{value:3800},{value:4100},{value:3900},{value:4300},{value:4500},{value:4832}]} />
              <StatCard title="Pages vues" value="7,421" change="+8.3%" icon={Eye} positive={true} chartData={[{value:6200},{value:6800},{value:6500},{value:7000},{value:7200},{value:7421}]} />
              <StatCard title="Taux rebond" value="42.8%" change="-3.2%" icon={MousePointer} positive={true} chartData={[{value:48},{value:46},{value:47},{value:45},{value:44},{value:42.8}]} />
              <StatCard title="Durée moy" value="3m 24s" change="+15.7%" icon={TrendingUp} positive={true} chartData={[{value:180},{value:185},{value:190},{value:195},{value:200},{value:204}]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`rounded-xl shadow-sm border p-8 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Évolution du trafic</h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={trafficData}>
                      <defs>
                        <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0597F2" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#0597F2" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3AAFFF" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3AAFFF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="mois" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                      <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="visiteurs" stroke="#0597F2" strokeWidth={3} fill="#0597F2" fillOpacity={0.2} name="Visiteurs" />
                      <Area type="monotone" dataKey="pages" stroke="#0597F2" strokeWidth={3} fill="#0597F2" fillOpacity={0.2} name="Pages" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sources</h3>
                  {sourcesData.map((s, i) => (
                    <div key={i} className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: s.color}} />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{s.name}</span>
                      </div>
                      <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}%</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl shadow-lg p-6 text-white" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                  <h3 className="text-lg font-bold mb-4">Page top</h3>
                  <div className="text-3xl font-bold mb-2">/accueil</div>
                  <div className="text-sm opacity-90">1,243 vues</div>
                  <div className="mt-4 pt-4 border-t border-white/30">
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowUp size={16} />
                      <span>+28%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-8">
            <PageHeader 
              icon={Search} 
              title="Référencement SEO" 
              subtitle="Suivez vos positions dans Google" 
              gradientFrom="#8b5cf6" 
              gradientTo="#7c3aed" 
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Position moy" value="8.4" change="+2.1" icon={Search} positive={true} chartData={[{value:10.2},{value:9.8},{value:9.5},{value:9.0},{value:8.7},{value:8.4}]} />
              <StatCard title="Clics" value="866" change="+18.2%" icon={MousePointer} positive={true} chartData={[{value:650},{value:700},{value:730},{value:780},{value:820},{value:866}]} />
              <StatCard title="Impressions" value="11,400" change="+24.5%" icon={Eye} positive={true} chartData={[{value:8500},{value:9200},{value:9800},{value:10400},{value:10900},{value:11400}]} />
            </div>

            <div className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mots-clés</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mot-clé</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Position</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clics</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Évolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seoData.map((item, idx) => (
                      <tr key={idx} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.mot_cle}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 text-xs font-bold rounded-full text-white shadow-md" style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}>
                            #{item.position}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{item.clics}</td>
                        <td className="px-4 py-3">
                          {item.evolution === 'up' ? (
                            <span className="flex items-center text-sm text-green-500">
                              <ArrowUp size={16} />
                            </span>
                          ) : (
                            <span className="flex items-center text-sm text-red-500">
                              <ArrowDown size={16} />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gmb' && (
          <div className="space-y-8">
            <PageHeader 
              icon={MapPin} 
              title="Google My Business" 
              subtitle="Gérez votre présence locale" 
              gradientFrom="#f59e0b" 
              gradientTo="#d97706" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Vues profil" value="3,420" change="+22.3%" icon={Eye} positive={true} chartData={[{value:2800},{value:3100},{value:2950},{value:3250},{value:3380},{value:3420}]} />
              <StatCard title="Recherches" value="892" change="+15.8%" icon={Search} positive={true} chartData={[{value:750},{value:820},{value:780},{value:850},{value:880},{value:892}]} />
              <StatCard title="Appels" value="156" change="+34.2%" icon={Phone} positive={true} chartData={[{value:95},{value:108},{value:112},{value:128},{value:145},{value:156}]} />
              <StatCard title="Itinéraires" value="234" change="+18.9%" icon={MapPin} positive={true} chartData={[{value:180},{value:195},{value:205},{value:215},{value:225},{value:234}]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Clics site web" value="487" change="+28.5%" icon={MousePointer} positive={true} chartData={[{value:320},{value:360},{value:395},{value:425},{value:458},{value:487}]} />
              <StatCard title="Messages" value="89" change="+42.1%" icon={MessageCircle} positive={true} chartData={[{value:45},{value:58},{value:63},{value:72},{value:81},{value:89}]} />
              <StatCard title="Photos vues" value="2,145" change="+31.7%" icon={Eye} positive={true} chartData={[{value:1450},{value:1680},{value:1820},{value:1950},{value:2050},{value:2145}]} />
              <StatCard title="Nouveaux avis" value="12" change="+45.0%" icon={Star} positive={true} chartData={[{value:6},{value:7},{value:8},{value:9},{value:11},{value:12}]} />
            </div>

            <div className="rounded-xl shadow-lg p-8 text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              <h2 className="text-xl font-bold mb-2">Note moyenne</h2>
              <div className="flex items-center gap-3">
                <div className="text-6xl font-bold">4.8</div>
                <div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" className="text-yellow-300" />)}
                  </div>
                  <p className="text-sm opacity-90 mt-1">47 avis</p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Derniers avis</h2>
              {gmbReviews.map((r, i) => (
                <div key={i} className={`p-4 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between mb-2">
                    <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{r.author}</div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Il y a {r.date}</span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= r.rating ? "#fbbf24" : "none"} className={s <= r.rating ? "text-yellow-400" : "text-gray-300"} />)}
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-8">
            <PageHeader 
              icon={MessageCircle} 
              title="Service Client" 
              subtitle="Discutez avec notre équipe" 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className={`rounded-xl shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>BT</div>
                      <div>
                        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Équipe Be-to</h2>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>En ligne</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 space-y-4 ${isDarkMode ? 'bg-gray-900/20' : 'bg-gray-50'} min-h-[400px]`}>
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}>
                        <div className="max-w-[70%]">
                          <div className="rounded-2xl px-4 py-3 shadow-sm" style={msg.from === 'client' ? { background: 'linear-gradient(135deg, #0597F2, #0476C5)', color: 'white' } : (isDarkMode ? { backgroundColor: '#1f2937', color: '#e5e7eb' } : { backgroundColor: 'white', color: '#111827', border: '1px solid #e5e7eb' })}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex gap-3">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Votre message..."
                        className={`flex-1 px-4 py-2 rounded-xl resize-none ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'}`}
                        rows="2"
                      />
                      <button 
                        onClick={() => {
                          if (messageText.trim()) {
                            setMessages([...messages, { id: messages.length + 1, from: 'client', text: messageText, time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }]);
                            setMessageText('');
                          }
                        }}
                        className="p-3 text-white rounded-xl transition-all hover:scale-105 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #0597F2, #0476C5)' }}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>01 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle size={18} style={{ color: '#0597F2' }} />
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>thomas@b-to.io</span>
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Chargé de compte</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shadow-lg" style={{ background: 'linear-gradient(to bottom right, #0597F2, #0476C5)' }}>TL</div>
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Thomas Léon</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chef de Projet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <PageHeader 
              icon={ShoppingCart} 
              title="Nos Services" 
              subtitle="Développez votre présence digitale" 
              gradientFrom="#8b5cf6" 
              gradientTo="#7c3aed" 
            />

            <div className={`rounded-xl shadow-sm border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Catégories
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Tous', 'SEO', 'Design', 'Marketing', 'Consulting'].map((cat) => (
                  <button 
                    key={cat}
                    className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                      cat === 'Tous' 
                        ? 'text-white shadow-md' 
                        : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                    }`}
                    style={cat === 'Tous' ? { background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div 
                  key={service.id} 
                  className={`rounded-xl shadow-sm border p-6 hover:shadow-xl transition-all hover:-translate-y-1 relative ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Zap size={14} />
                        Populaire
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                      <ShoppingCart size={24} className="text-white" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold mb-3 px-3 py-1 rounded-full inline-block" style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>
                    {service.category}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 min-h-[56px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {service.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 min-h-[60px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.category === 'SEO' && 'Améliorez votre visibilité sur Google et attirez plus de clients qualifiés.'}
                    {service.category === 'Design' && 'Offrez une expérience visuelle moderne et attractive à vos visiteurs.'}
                    {service.category === 'Marketing' && 'Maximisez votre ROI avec des campagnes publicitaires ciblées.'}
                    {service.category === 'Consulting' && 'Bénéficiez de notre expertise pour faire croître votre activité.'}
                  </p>

                  <div className={`text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent`}>
                    {service.price}
                  </div>

                  <div className="space-y-2 mb-6">
                    {[
                      'Support prioritaire',
                      'Reporting détaillé',
                      'Garantie résultats'
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="w-full py-3 rounded-lg font-medium text-white shadow-lg transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                  >
                    <ShoppingCart size={18} className="inline mr-2" />
                    Commander
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: 'Satisfaction garantie',
                  description: 'Résultats mesurables ou remboursé',
                  color: '#10b981'
                },
                {
                  icon: Clock,
                  title: 'Livraison rapide',
                  description: 'Démarrage sous 48h maximum',
                  color: '#8b5cf6'
                },
                {
                  icon: HeadphonesIcon,
                  title: 'Support dédié',
                  description: 'Accompagnement personnalisé',
                  color: '#0597F2'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className={`rounded-xl shadow-sm border p-6 text-center transition-all hover:shadow-xl ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${item.color}20` }}>
                    <item.icon size={28} style={{ color: item.color }} />
                  </div>
                  <h4 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={`rounded-xl border p-10 text-center relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
                : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100'
            }`}>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                  <MessageCircle size={40} className="text-white" />
                </div>
                <h3 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Besoin d'un service sur mesure ?
                </h3>
                <p className={`mb-8 text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Nos experts analysent vos besoins et créent une solution 100% adaptée à vos objectifs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => setActiveTab('support')}
                    className="px-8 py-4 rounded-xl font-semibold text-white inline-flex items-center gap-3 transition-all hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                  >
                    <MessageCircle size={20} />
                    Demander un devis gratuit
                  </button>
                  <button 
                    className={`px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 transition-all hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Phone size={20} />
                    01 23 45 67 89
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            </div>

            <div>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Ce que disent nos clients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Marie D.',
                    company: 'E-commerce Mode',
                    text: 'Résultats impressionnants en SEO ! Notre trafic a doublé en 3 mois.',
                    rating: 5
                  },
                  {
                    name: 'Thomas L.',
                    company: 'Cabinet Avocat',
                    text: 'Équipe très professionnelle et à l\'écoute. Je recommande vivement.',
                    rating: 5
                  },
                  {
                    name: 'Sophie M.',
                    company: 'Restaurant',
                    text: 'Le service Google Ads a multiplié nos réservations par 3. Parfait !',
                    rating: 5
                  }
                ].map((testimonial, i) => (
                  <div 
                    key={i}
                    className={`rounded-xl shadow-sm border p-6 ${
                      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" className="text-yellow-400" />
                      ))}
                    </div>
                    <p className={`text-sm mb-4 italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {testimonial.name}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'profil' && <Profile isDarkMode={isDarkMode} />}

        {activeTab === 'parametres' && <Settings isDarkMode={isDarkMode} />}
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;