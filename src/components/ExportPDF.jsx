import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';

export default function ExportPDF({ isDarkMode, data, reportType = 'analytics' }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const generatePDF = () => {
    setIsExporting(true);

    // Simulation de génération PDF
    setTimeout(() => {
      const reportName = getReportName();
      
      // Créer un blob simulé (dans un vrai cas, utilisez jspdf ou pdfmake)
      const content = generateReportContent();
      const blob = new Blob([content], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Télécharger
      const a = document.createElement('a');
      a.href = url;
      a.download = reportName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 2000);
  };

  const getReportName = () => {
    const date = new Date().toISOString().split('T')[0];
    const names = {
      analytics: `Rapport_Analytics_${date}.pdf`,
      seo: `Rapport_SEO_${date}.pdf`,
      gmb: `Rapport_GMB_${date}.pdf`,
      complet: `Rapport_Complet_${date}.pdf`
    };
    return names[reportType] || `Rapport_${date}.pdf`;
  };

  const generateReportContent = () => {
    // Contenu texte simulé (remplacer par vraie génération PDF)
    return `
=================================================
      RAPPORT ${reportType.toUpperCase()}
      BforBiz SAS
      ${new Date().toLocaleDateString('fr-FR')}
=================================================

RÉSUMÉ EXÉCUTIF
---------------
Ce rapport présente les performances de votre site web
pour la période sélectionnée.

DONNÉES CLÉS
------------
- Visiteurs: 4,832 (+12.5%)
- Pages vues: 7,421 (+8.3%)
- Taux de rebond: 42.8% (-3.2%)
- Durée moyenne: 3m 24s (+15.7%)

ANALYSE
-------
Votre site montre une croissance constante avec une
augmentation significative du trafic organique.

Les mots-clés principaux progressent bien dans les
classements Google.

RECOMMANDATIONS
---------------
1. Continuer l'optimisation SEO
2. Produire plus de contenu de qualité
3. Améliorer la vitesse de chargement

---
Rapport généré par Be-to Dashboard
https://dashboard.be-to.io
    `;
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isExporting || exported}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-sm text-white transition-all ${
        exported 
          ? 'bg-green-500' 
          : 'bg-blue-500 hover:bg-blue-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isExporting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Export en cours...</span>
        </>
      ) : exported ? (
        <>
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Exporté</span>
        </>
      ) : (
        <>
          <Download size={18} />
          <span className="text-sm font-medium">Exporter PDF</span>
        </>
      )}
    </button>
  );
}