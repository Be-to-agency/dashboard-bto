import React, { useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PDFViewer({ isDarkMode, fileUrl, fileName, onClose }) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Simulé

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`w-full h-full max-w-6xl mx-4 my-4 flex flex-col rounded-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center gap-4">
            <h3 className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {fileName}
            </h3>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Page {currentPage} / {totalPages}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Zoom arrière"
            >
              <ZoomOut size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            
            <span className={`text-sm px-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {zoom}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Zoom avant"
            >
              <ZoomIn size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            
            <div className={`w-px h-6 mx-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            
            <button
              onClick={handleDownload}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Télécharger"
            >
              <Download size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Fermer"
            >
              <X size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div className={`flex-1 overflow-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-center min-h-full p-8">
            <div 
              className="bg-white shadow-2xl"
              style={{ 
                width: `${zoom}%`,
                maxWidth: '1000px'
              }}
            >
              {/* Simulation d'un PDF - remplacer par une vraie librairie comme react-pdf */}
              <div className="aspect-[8.5/11] flex items-center justify-center border border-gray-200">
                <div className="text-center p-8">
                  <p className="text-gray-400 mb-2">Prévisualisation PDF</p>
                  <p className="text-sm text-gray-500">{fileName}</p>
                  <p className="text-xs text-gray-400 mt-4">
                    Utilisez react-pdf pour afficher de vrais PDFs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Navigation */}
        <div className={`flex items-center justify-center gap-4 p-4 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Page {currentPage} sur {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronRight size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>
      </div>
    </div>
  );
}