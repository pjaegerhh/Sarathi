/**
 * Media Upload Modal Component
 * Allows users to upload photos and videos
 */

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface MediaUploadModalProps {
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  onClose,
  onUpload
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    if (files.length > 0) {
      onUpload(files);
      onClose();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
      onClose();
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          width: '448px',
          maxWidth: '90%',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '0.8px solid #e0ebe3',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '73px'
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '32px',
                color: '#192126',
                textAlign: 'center',
                margin: 0
              }}
            >
              {t.community.addPhotosVideos}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px 0px #ddd',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = '#388896';
              e.currentTarget.style.boxShadow = '0px 0px 15px rgba(56, 136, 150, 0.5)';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.setAttribute('stroke', '#ffffff');
                icon.setAttribute('color', '#ffffff');
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.boxShadow = '0px 0px 10px 0px #ddd';
              const icon = e.currentTarget.querySelector('svg');
              if (icon) {
                icon.setAttribute('stroke', '#505050');
                icon.setAttribute('color', '#505050');
              }
            }}
          >
            <X size={24} color="#505050" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: '327px'
          }}
        >
          {/* Drop Zone */}
          <div
            onClick={handleUploadAreaClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: `0.8px solid ${isDragging ? '#388896' : '#e0ebe3'}`,
              borderRadius: '10px',
              height: '223px',
              position: 'relative',
              cursor: 'pointer',
              background: isDragging ? '#f0f8f9' : 'transparent',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Icon */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '32.8px',
                transform: 'translateX(-50%)',
                background: '#e0ebe3',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Upload size={32} color="#388896" />
            </div>

            {/* Text */}
            <div
              style={{
                position: 'absolute',
                left: '32.8px',
                right: '32.8px',
                top: '110.6px',
                textAlign: 'center',
                color: '#979797',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px'
              }}
            >
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  margin: 0
                }}
              >
                {t.community.clickToUploadPhotosVideos}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  margin: 0
                }}
              >
                {t.community.orDragAndDrop}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '22px',
                  margin: 0
                }}
              >
                {t.community.pngJpgGifMp4UpTo10mb}
              </p>
            </div>
          </div>

          {/* Browse Button */}
          <button
            onClick={handleBrowseClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              height: '48px',
              borderRadius: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ImageIcon size={24} color="#388896" />
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '24px',
                color: '#505050',
                margin: 0
              }}
            >
              {t.community.browsePhotosVideos}
            </p>
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '0.8px solid #e0ebe3',
            padding: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            height: '72.8px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 24px',
              height: '36px',
              boxShadow: '0px 0px 10px 0px #ddd',
              cursor: 'pointer'
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#388896',
                margin: 0,
                lineHeight: '20px'
              }}
            >
              {t.common.cancel}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
