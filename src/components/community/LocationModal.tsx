import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { indiaLocations, getLocationIcon } from '../../utils/indiaLocations';
import { MapPin, Mic, X, Globe, Map } from 'lucide-react';
import { NearbyCitiesModal } from './NearbyCitiesModal';
import { MapLocationPicker } from './MapLocationPicker';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  currentLocation?: string;
}

export function LocationModal({ isOpen, onClose, onSelectLocation, currentLocation }: LocationModalProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(indiaLocations);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showNearbyCities, setShowNearbyCities] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = indiaLocations.filter(loc =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (loc.state && loc.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
        loc.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(indiaLocations);
    }
  }, [searchQuery]);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Reverse geocode coordinates to get location name
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
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
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          alert(t.community.locationError || 'Unable to get current location');
        }
      );
    } else {
      setIsGettingLocation(false);
      alert(t.community.locationNotSupported || 'Geolocation not supported');
    }
  };

  const handleNearbyClick = () => {
    if ('geolocation' in navigator) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setIsGettingLocation(false);
          setShowNearbyCities(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          alert(t.community.locationError || 'Unable to get current location');
        }
      );
    } else {
      alert(t.community.locationNotSupported || 'Geolocation not supported');
    }
  };

  const handleMapPickerClick = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setShowMapPicker(true);
        },
        () => {
          // If geolocation fails, still open map with default location
          setShowMapPicker(true);
        }
      );
    } else {
      setShowMapPicker(true);
    }
  };

  const handleMapLocationSelect = (locationName: string) => {
    onSelectLocation(locationName);
    setShowMapPicker(false);
    onClose();
  };

  const handleSelectLocation = (locationName: string) => {
    onSelectLocation(locationName);
    onClose();
  };

  if (!isOpen) return null;

  // Get suggested locations (top cities/states)
  const suggestedLocations = [
    { name: 'Nearby', icon: <Globe size={20} />, subtitle: t.community.findNearby || "Find what's around you" },
    ...indiaLocations.slice(0, 3).map(loc => ({
      name: loc.name,
      icon: getLocationIcon(loc.type),
      subtitle: `${loc.state || loc.type} - ${loc.region}`
    }))
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
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
            {t.community.addLocation || 'Add Location'}
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

        {/* Search */}
        <div
          style={{
            borderBottom: '0.8px solid #e5e7eb',
            padding: '10px 16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              border: '0.5px solid #c7c8d5',
              borderRadius: '10px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0px 1px 2px rgba(228, 229, 231, 0.24)',
            }}
          >
            <MapPin size={24} color="#c7c8d5" />
            <input
              type="text"
              placeholder={t.community.searchLocation || 'Search Location'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                color: '#979797',
                backgroundColor: 'transparent',
              }}
            />
            <Mic size={24} color="#c7c8d5" />
          </div>
        </div>

        {/* Current Location */}
        <div
          style={{
            borderBottom: '0.8px solid #e5e7eb',
            padding: '16px',
          }}
        >
          {/* Map Picker Button */}
          <button
            onClick={handleMapPickerClick}
            style={{
              width: '100%',
              backgroundColor: '#e0ebe3',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 10px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                backgroundColor: '#388896',
                borderRadius: '36px',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Map size={24} color="#fff" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#505050',
                  margin: 0,
                }}
              >
                {t.community.selectOnMap || 'Select on map'}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#505050',
                  margin: 0,
                }}
              >
                {t.community.pickLocationFromMap || 'Pick location from interactive map'}
              </p>
            </div>
          </button>

          {/* Current Location Button */}
          <button
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            style={{
              width: '100%',
              backgroundColor: '#e0ebe3',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: isGettingLocation ? 'wait' : 'pointer',
            }}
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
              }}
            >
              <Globe size={24} color="#505050" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#505050',
                  margin: 0,
                }}
              >
                {isGettingLocation ? (t.community.gettingLocation || 'Getting location...') : (t.community.addCurrentLocation || 'Add current location')}
              </p>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#505050',
                  margin: 0,
                }}
              >
                {t.community.getCurrentLocation || 'Get your current location'}
              </p>
            </div>
          </button>
        </div>

        {/* Suggested Locations */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px 14px',
              boxShadow: '0px 0px 10px rgba(221, 221, 221, 0.87)',
            }}
          >
            <div style={{ padding: '8px', marginBottom: '13px' }}>
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#979797',
                  margin: 0,
                }}
              >
                {searchQuery ? t.community.searchResults || 'Search Results' : t.community.suggested || 'Suggested'}
              </p>
            </div>

            {!searchQuery && suggestedLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => loc.name === 'Nearby' ? handleNearbyClick() : handleSelectLocation(loc.name)}
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 10px',
                  marginBottom: '13px',
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
                  {typeof loc.icon === 'string' ? loc.icon : loc.icon}
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
                    {loc.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#979797',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {loc.subtitle}
                  </p>
                </div>
              </button>
            ))}

            {/* All Cities/States - Scrollable List */}
            {!searchQuery && (
              <>
                <div style={{ padding: '8px', marginTop: '20px', marginBottom: '13px' }}>
                  <p
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#979797',
                      margin: 0,
                    }}
                  >
                    {t.community.allLocations || 'All Locations'}
                  </p>
                </div>
                {indiaLocations.slice(3).map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectLocation(loc.name)}
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
                      {getLocationIcon(loc.type)}
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
                        {loc.name}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#979797',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {loc.state ? `${loc.state} - ${loc.region}` : loc.region}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            )}

            {/* Search Results */}
            {searchQuery && filteredLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectLocation(loc.name)}
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
                  {getLocationIcon(loc.type)}
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
                    {loc.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#979797',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {loc.state ? `${loc.state} - ${loc.region}` : loc.region}
                  </p>
                </div>
              </button>
            ))}

            {searchQuery && filteredLocations.length === 0 && (
              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  color: '#979797',
                  textAlign: 'center',
                  padding: '20px',
                }}
              >
                {t.community.noLocationsFound || 'No locations found'}
              </p>
            )}
          </div>
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

      {/* Nearby Cities Modal */}
      {userCoordinates && (
        <NearbyCitiesModal
          isOpen={showNearbyCities}
          onClose={() => {
            setShowNearbyCities(false);
            setUserCoordinates(null);
          }}
          onSelectLocation={(location) => {
            onSelectLocation(location);
            setShowNearbyCities(false);
            setUserCoordinates(null);
            onClose();
          }}
          userLat={userCoordinates.lat}
          userLon={userCoordinates.lon}
        />
      )}

      {/* Map Location Picker */}
      <MapLocationPicker
        isOpen={showMapPicker}
        onClose={() => setShowMapPicker(false)}
        onSelectLocation={handleMapLocationSelect}
        initialLat={userCoordinates?.lat}
        initialLon={userCoordinates?.lon}
      />
    </div>
  );
}
