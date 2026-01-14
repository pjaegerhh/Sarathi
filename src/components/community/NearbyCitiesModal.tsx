import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { X } from 'lucide-react';

interface NearbyCitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  userLat: number;
  userLon: number;
}

interface NearbyCity {
  name: string;
  distance: number;
  type: string;
  population?: number;
}

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function NearbyCitiesModal({ isOpen, onClose, onSelectLocation, userLat, userLon }: NearbyCitiesModalProps) {
  const { t } = useLanguage();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [citiesWithDistance, setCitiesWithDistance] = useState<NearbyCity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchNearbyCities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use Overpass API - working version
        const radius = 50000; // 50km in meters
        
        const overpassQuery = `
          [out:json][timeout:12];
          node["place"~"city|town|village"](around:${radius},${userLat},${userLon});
          out body;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: overpassQuery,
        });

        if (!response.ok) {
          throw new Error(`Overpass API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.elements || data.elements.length === 0) {
          setError('No cities found nearby');
          setIsLoading(false);
          return;
        }
        
        // Process results
        const placeMap = new Map<string, NearbyCity>();
        
        data.elements.forEach((element: any) => {
          if (element.tags?.name && element.lat && element.lon) {
            const name = element.tags.name;
            const lat = element.lat;
            const lon = element.lon;
            const distance = calculateDistance(userLat, userLon, lat, lon);
            
            const placeType = element.tags.place || 'city';
            let type: 'city' | 'town' | 'village' = 'city';
            if (placeType === 'town') type = 'town';
            else if (placeType === 'village') type = 'village';
            else if (placeType === 'city') type = 'city';
            
            // Only keep the closest instance of each place name
            if (!placeMap.has(name) || placeMap.get(name)!.distance > distance) {
              placeMap.set(name, {
                name: name,
                distance: distance,
                type: type,
                population: element.tags.population ? parseInt(element.tags.population) : undefined,
              });
            }
          }
        });
        
        // Convert map to array and sort
        const cities: NearbyCity[] = Array.from(placeMap.values())
          .sort((a: NearbyCity, b: NearbyCity) => {
            // Sort by place type importance first, then distance
            const placeOrder: { [key: string]: number } = { city: 1, town: 2, village: 3 };
            const aOrder = placeOrder[a.type] || 999;
            const bOrder = placeOrder[b.type] || 999;
            
            if (aOrder !== bOrder) return aOrder - bOrder;
            
            // If same type, sort by population (if available), then distance
            if (a.population && b.population) {
              return b.population - a.population;
            }
            
            return a.distance - b.distance;
          })
          .slice(0, 10); // Top 10 results

        setCitiesWithDistance(cities);
      } catch (err) {
        console.error('Error fetching nearby cities:', err);
        setError('Failed to load nearby cities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyCities();
  }, [isOpen, userLat, userLon]);

  if (!isOpen) return null;

  const handleSelectCity = (cityName: string) => {
    onSelectLocation(cityName);
    onClose();
  };

  const handleUseCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      // Reverse geocode coordinates to get location name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLon}&accept-language=en`
      );
      const data = await response.json();
      
      // Extract city/village/town name
      const locationName = 
        data.address?.city || 
        data.address?.town || 
        data.address?.village || 
        data.address?.state_district ||
        data.address?.state ||
        'Current Location';
      
      onSelectLocation(locationName);
      setIsGettingLocation(false);
      onClose();
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      onSelectLocation('Current Location');
      setIsGettingLocation(false);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '448px',
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
            {t.community.nearbyCities || 'Nearby Cities'}
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

        {/* Cities List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
          }}
        >
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              {/* Loading Spinner */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '4px solid #e0ebe3',
                  borderTop: '4px solid #388896',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px',
                }}
              />
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#979797',
                }}
              >
                {t.community.searchingNearbyCities || 'Searching for nearby cities...'}
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#dc2626',
                  marginBottom: '20px',
                }}
              >
                {error}
              </p>
              <button
                onClick={handleUseCurrentLocation}
                disabled={isGettingLocation}
                style={{
                  backgroundColor: '#388896',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '10px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#fff',
                  cursor: isGettingLocation ? 'wait' : 'pointer',
                  opacity: isGettingLocation ? 0.6 : 1,
                }}
              >
                {isGettingLocation 
                  ? (t.community.gettingLocation || 'Getting location...') 
                  : (t.community.useExactLocation || 'Use exact location')}
              </button>
            </div>
          ) : citiesWithDistance.length > 0 ? (
            <>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#979797',
                  marginBottom: '16px',
                }}
              >
                {t.community.citiesWithin50km || 'Cities within 50km'}
              </p>
              {citiesWithDistance.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCity(city.name)}
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <div
                    style={{
                      backgroundColor: '#e0ebe3',
                      borderRadius: '36px',
                      width: '45px',
                      height: '45px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}
                  >
                    {city.type === 'city' ? '🏙️' : city.type === 'town' ? '🏘️' : '🏡'}
                  </div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#979797',
                        margin: 0,
                      }}
                    >
                      {city.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#979797',
                        margin: 0,
                      }}
                    >
                      {city.distance.toFixed(1)} km {t.community.away || 'away'}
                      {city.population && ` • ${(city.population / 1000).toFixed(0)}k`}
                    </p>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#979797',
                  marginBottom: '20px',
                }}
              >
                {t.community.noCitiesNearby || 'No cities found within 50km'}
              </p>
              <button
                onClick={handleUseCurrentLocation}
                disabled={isGettingLocation}
                style={{
                  backgroundColor: '#388896',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '10px 24px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#fff',
                  cursor: isGettingLocation ? 'wait' : 'pointer',
                  opacity: isGettingLocation ? 0.6 : 1,
                }}
              >
                {isGettingLocation 
                  ? (t.community.gettingLocation || 'Getting location...') 
                  : (t.community.useExactLocation || 'Use exact location')}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '0.8px solid #e5e7eb',
            padding: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
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
        </div>
      </div>
    </div>
  );
}
