import React, { useState, useRef } from 'react';
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react';

export default function FileUpload({ isDarkMode, onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const filesWithStatus = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending',
      progress: 0
    }));
    setFiles([...files, ...filesWithStatus]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const uploadFiles = () => {
    setUploading(true);
    
    files.forEach((fileItem, index) => {
      setTimeout(() => {
        simulateUpload(fileItem.id);
      }, index * 1000);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { ...f, progress, status: progress === 100 ? 'success' : 'uploading' }
            : f
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
          if (files.every(f => f.status === 'success' || f.id === fileId)) {
            setUploading(false);
            onUploadComplete && onUploadComplete();
          }
        }, 1000);
      }
    }, 200);
  };

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : isDarkMode
              ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
      >
        <Upload 
          size={48} 
          className={`mx-auto mb-4 ${isDragging ? 'text-blue-500' : (isDarkMode ? 'text-gray-500' : 'text-gray-400')}`}
        />
        <p className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Glissez vos fichiers ici ou cliquez pour parcourir
        </p>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          PDF, DOC, XLSX, JPG jusqu'à 10 MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png"
        />
      </div>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <div className={`rounded-xl border p-4 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="space-y-3">
            {files.map(fileItem => (
              <div 
                key={fileItem.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  fileItem.status === 'success' 
                    ? 'bg-green-500/20' 
                    : 'bg-blue-500/20'
                }`}>
                  {fileItem.status === 'success' ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <File className="text-blue-500" size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {fileItem.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {fileItem.size}
                    </p>
                    {fileItem.status === 'uploading' && (
                      <p className="text-xs text-blue-500">
                        {fileItem.progress}%
                      </p>
                    )}
                  </div>
                  
                  {fileItem.status === 'uploading' && (
                    <div className={`mt-2 h-1 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {fileItem.status === 'pending' && (
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className={`p-1 rounded-lg transition-colors ${
                      isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    }`}
                  >
                    <X size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {files.some(f => f.status === 'pending') && (
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="w-full mt-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Upload en cours...' : `Téléverser ${files.length} fichier(s)`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}