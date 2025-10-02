import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Image, Video, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaType: 'avatar' | 'cover' | 'video';
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  mentorId: string;
}

/**
 * Media upload modal component for avatar, cover, and video uploads
 */
const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  mediaType,
  currentUrl,
  onUploadComplete,
  mentorId
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getMediaConfig = () => {
    switch (mediaType) {
      case 'avatar':
        return {
          title: 'Avatar Yükle',
          icon: <Camera className="w-8 h-8" />,
          motivation: 'İlk izlenim çok önemli 🌟',
          accept: 'image/jpeg,image/png,image/webp',
          maxSize: 2 * 1024 * 1024, // 2MB
          aspectRatio: '1:1',
          minDimensions: '400×400px',
          description: 'Kare format profil fotoğrafı'
        };
      case 'cover':
        return {
          title: 'Kapak Görseli Yükle',
          icon: <Image className="w-8 h-8" />,
          motivation: 'Kendi sahneni hazırla 🎨',
          accept: 'image/jpeg,image/png,image/webp',
          maxSize: 5 * 1024 * 1024, // 5MB
          aspectRatio: '16:9',
          minDimensions: '1280×720px',
          description: 'Geniş format kapak görseli'
        };
      case 'video':
        return {
          title: 'Tanıtım Videosu Yükle',
          icon: <Video className="w-8 h-8" />,
          motivation: 'Kendi hikayeni paylaş 🎥 (opsiyonel)',
          accept: 'video/mp4',
          maxSize: 200 * 1024 * 1024, // 200MB
          aspectRatio: '16:9',
          minDimensions: '720p+',
          description: 'MP4 format tanıtım videosu'
        };
      default:
        return null;
    }
  };

  const config = getMediaConfig();
  if (!config) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // File size check
    if (file.size > config.maxSize) {
      return `Dosya çok büyük. Maksimum boyut: ${formatFileSize(config.maxSize)}`;
    }

    // File type check
    if (!config.accept.split(',').includes(file.type)) {
      return `Desteklenmeyen format. İzin verilen: ${config.accept}`;
    }

    // Video duration check (would need actual video analysis)
    if (mediaType === 'video') {
      // This would be implemented with video metadata reading
      // For now, just a placeholder
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Step 1: Get presigned URL
      const urlResponse = await fetch(`/api/mentors/${mentorId}/media/${mediaType}-upload-url`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content_type: selectedFile.type,
          file_size: selectedFile.size
        })
      });

      if (!urlResponse.ok) {
        throw new Error('Upload URL alınamadı');
      }

      const { upload_url, upload_id } = await urlResponse.json();

      // Step 2: Upload file to storage
      const uploadResponse = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': selectedFile.type
        },
        body: selectedFile
      });

      if (!uploadResponse.ok) {
        throw new Error('Dosya yükleme başarısız');
      }

      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Step 3: Commit URL to profile
      const finalUrl = `https://cdn.mentorhub.com/${mediaType}s/${mentorId}.webp`;
      const commitResponse = await fetch(`/api/mentors/${mentorId}/media/commit`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [`${mediaType}_url`]: finalUrl
        })
      });

      if (!commitResponse.ok) {
        throw new Error('URL kaydedilemedi');
      }

      // Success
      onUploadComplete(finalUrl);
      onClose();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yükleme hatası');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderPreview = () => {
    const url = previewUrl || currentUrl;
    if (!url) return null;

    if (mediaType === 'video') {
      return (
        <div className="relative">
          <video
            src={url}
            className="w-full h-48 object-cover rounded-lg"
            controls
            muted
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <img
          src={url}
          alt={`${mediaType} preview`}
          className={`object-cover rounded-lg ${
            mediaType === 'avatar' 
              ? 'w-32 h-32 rounded-full mx-auto' 
              : 'w-full h-48'
          }`}
        />
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {config.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{config.title}</h3>
              <p className="text-sm text-gray-600">{config.motivation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current/Preview */}
          {(previewUrl || currentUrl) && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Önizleme:</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                {renderPreview()}
                {selectedFile && (
                  <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Dosya:</strong> {selectedFile.name}</p>
                    <p><strong>Boyut:</strong> {formatFileSize(selectedFile.size)}</p>
                    <p><strong>Tip:</strong> {selectedFile.type}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* File Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Dosya Seç:</h4>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedFile ? selectedFile.name : 'Dosya seçin veya sürükleyin'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {config.description}
                  </p>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>💡 Format: {config.aspectRatio}</p>
                  <p>📏 Minimum: {config.minDimensions}</p>
                  <p>📦 Maksimum: {formatFileSize(config.maxSize)}</p>
                  <p>🎨 Desteklenen: {config.accept.replace(/image\/|video\//g, '').toUpperCase()}</p>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={config.accept}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium text-blue-900">Yükleniyor...</span>
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-blue-800">
                  <span>{progress}% tamamlandı</span>
                  <span>
                    {mediaType === 'video' ? 'Video işleniyor...' : 
                     mediaType === 'avatar' ? 'Avatar işleniyor...' : 
                     'Görsel işleniyor...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-900">Yükleme Başarısız</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {!uploading && selectedFile && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Dosya Hazır</h4>
                  <p className="text-sm text-green-700">
                    {selectedFile.name} yüklenmeye hazır
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {selectedFile && (
              <button
                onClick={handleRemove}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Değiştir</span>
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors min-h-[44px]"
            >
              İptal
            </button>
            
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Yükleniyor...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Yükle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;