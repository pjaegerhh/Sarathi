import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { useLanguage } from '../contexts/LanguageContext';

const PROFILE_TARGET_SIZE = 186; // matches ellipse container
const COVER_TARGET_WIDTH = 1280;
const COVER_TARGET_HEIGHT = 420;

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: Blob) => void;
  aspect?: number;
}

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageCropDialog({ 
  open, 
  onOpenChange, 
  imageSrc, 
  onCropComplete,
  aspect = 1280 / 420 // Default aspect ratio for cover picture
}: ImageCropDialogProps) {
  const { t } = useLanguage();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);

  // Reset crop and zoom when dialog opens
  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open]);

  const onCropCompleteInternal = useCallback((_croppedArea: any, croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    if (!croppedAreaPixels) {
      console.error('No cropped area selected');
      return;
    }

    try {
      const image = new Image();
      image.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('Could not get canvas context');
        return;
      }

      // For cover photos (aspect 1280/420), resize to exactly 1280x420
      // For profile photos (aspect 1), resize to 186x186 to match ellipse container
      const targetWidth = aspect === 1280 / 420 ? COVER_TARGET_WIDTH : PROFILE_TARGET_SIZE;
      const targetHeight = aspect === 1280 / 420 ? COVER_TARGET_HEIGHT : PROFILE_TARGET_SIZE;

      // Set canvas size to target dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw the cropped image, resized to target dimensions
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        targetWidth,
        targetHeight
      );

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          onCropComplete(blob);
          onOpenChange(false);
        } else {
          console.error('Failed to create blob from canvas');
        }
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Error creating cropped image:', error);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '30px',
          padding: '32px',
          maxWidth: '900px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#192126" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <h2 style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '22px',
          fontWeight: 400,
          lineHeight: '32px',
          color: '#192126',
          margin: '0 0 24px 0',
        }}>
          {t.profile.cropImage}
        </h2>
        
        {/* Cropper */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          backgroundColor: '#000000',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px',
        }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            minZoom={0.3}
            maxZoom={3}
            cropShape={aspect === 1 ? 'round' : 'rect'}
            restrictPosition={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        {/* Zoom control */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <label style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#192126',
              minWidth: '60px',
            }}>
              Zoom
            </label>
            <input
              type="range"
              min={0.3}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{
                flex: 1,
                height: '8px',
                borderRadius: '4px',
                background: '#f2f2f7',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <span style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#505050',
              minWidth: '40px',
            }}>
              {zoom.toFixed(1)}x
            </span>
          </div>
        </div>

        {/* Footer buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={() => onOpenChange(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f2f2f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
            }}
            style={{
              background: '#ffffff',
              border: '1px solid #d9d9d9',
              borderRadius: '24px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#192126',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t.profile.cancel}
          </button>
          <button
            onClick={createCroppedImage}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2d6d78';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#388896';
            }}
            style={{
              background: '#388896',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t.profile.cropAndSave}
          </button>
        </div>
      </div>
    </div>
  );
}

