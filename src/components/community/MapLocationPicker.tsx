import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { X, MapPin } from 'lucide-react';

interface MapLocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string, lat: number, lon: number) => void;
  initialLat?: number;
  initialLon?: number;
}

export function MapLocationPicker({ isOpen, onClose, onSelectLocation, initialLat, initialLon }: MapLocationPickerProps) {
  const { t } = useLanguage();
  const [selectedLat, setSelectedLat] = useState<number | null>(null);
  const [selectedLon, setSelectedLon] = useState<number | null>(null);
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    let mapInstance: any = null;

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      try {
        // Add Leaflet CSS if not already present
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
          
          // Wait for CSS to load
          await new Promise((resolve) => {
            link.onload = resolve;
            setTimeout(resolve, 1000); // Fallback timeout
          });
        }

        // Load Leaflet JS
        if (!(window as any).L) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          document.head.appendChild(script);
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            setTimeout(resolve, 3000); // Fallback timeout
          });
        }

        const L = (window as any).L;
        if (!L) {
          console.error('Leaflet failed to load');
          return;
        }

        // Initialize map only if not already initialized
        if (!mapInstanceRef.current && mapContainerRef.current) {
          const centerLat = initialLat || 20.5937; // Default to India center
          const centerLon = initialLon || 78.9629;

          // Small delay to ensure container is rendered
          await new Promise(resolve => setTimeout(resolve, 100));

          mapInstance = L.map(mapContainerRef.current, {
            center: [centerLat, centerLon],
            zoom: 10,
            zoomControl: true,
          });

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(mapInstance);

          // Force map to resize
          setTimeout(() => {
            if (mapInstance) {
              mapInstance.invalidateSize();
            }
          }, 200);

          // Add click handler
          mapInstance.on('click', async (e: any) => {
            const { lat, lng } = e.latlng;
            setSelectedLat(lat);
            setSelectedLon(lng);

            // Remove existing marker
            if (markerRef.current && mapInstance) {
              mapInstance.removeLayer(markerRef.current);
            }

            // Add new marker
            if (mapInstance) {
              markerRef.current = L.marker([lat, lng]).addTo(mapInstance);
            }

            // Reverse geocode to get location name
            setIsLoading(true);
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`
              );
              const data = await response.json();
              const locationName =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                data.address?.state_district ||
                data.address?.state ||
                'Selected Location';
              setSelectedLocationName(locationName);
            } catch (error) {
              console.error('Error reverse geocoding:', error);
              setSelectedLocationName('Selected Location');
            } finally {
              setIsLoading(false);
            }
          });

          mapInstanceRef.current = mapInstance;

          // If we have initial coordinates, add a marker
          if (initialLat && initialLon) {
            markerRef.current = L.marker([initialLat, initialLon]).addTo(mapInstance);
          }
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    loadLeaflet();

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen, initialLat, initialLon]);

  const handleConfirm = () => {
    if (selectedLat !== null && selectedLon !== null && selectedLocationName) {
      onSelectLocation(selectedLocationName, selectedLat, selectedLon);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1002,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '90vw',
          maxWidth: '800px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '0.8px solid #e5e7eb',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '22px',
              fontWeight: 400,
              color: '#192126',
              margin: 0,
            }}
          >
            {t.community.selectLocationOnMap || 'Select Location on Map'}
          </p>
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
              boxShadow: '0px 0px 10px rgba(221, 221, 221, 1)',
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
              e.currentTarget.style.boxShadow = '0px 0px 10px rgba(221, 221, 221, 1)';
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

        {/* Map Container */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            minHeight: '500px',
            height: '600px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={mapContainerRef}
            id="map-picker-container"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          
          {/* Selected Location Info */}
          {selectedLocationName && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '12px 16px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 1000,
              }}
            >
              <MapPin size={20} color="#388896" />
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#192126',
                    margin: 0,
                  }}
                >
                  {selectedLocationName}
                </p>
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '12px',
                    color: '#979797',
                    margin: 0,
                  }}
                >
                  {selectedLat?.toFixed(6)}, {selectedLon?.toFixed(6)}
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              borderRadius: '8px',
              padding: '8px 16px',
              zIndex: 1000,
            }}
          >
            <p
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: '13px',
                color: '#fff',
                margin: 0,
              }}
            >
              {t.community.clickMapToSelect || 'Click on the map to select a location'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '0.8px solid #e5e7eb',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#388896',
              cursor: 'pointer',
              boxShadow: '0px 0px 10px rgba(221, 221, 221, 1)',
            }}
          >
            {t.community.cancel || 'Cancel'}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedLocationName || isLoading}
            style={{
              backgroundColor: selectedLocationName && !isLoading ? '#388896' : '#cccccc',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 24px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              cursor: selectedLocationName && !isLoading ? 'pointer' : 'not-allowed',
              opacity: selectedLocationName && !isLoading ? 1 : 0.6,
            }}
          >
            {isLoading ? (t.community.gettingLocation || 'Getting location...') : (t.community.selectLocation || 'Select Location')}
          </button>
        </div>
      </div>
    </div>
  );
}
