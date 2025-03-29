import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import { FiMapPin, FiAlertTriangle, FiInfo } from 'react-icons/fi';
import BackButton from '../components/BackButton';
import 'accident-alert-frontend\src\styles\map.css';

const AccidentMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [map, setMap] = useState(null);
  
  // Sample geofenced zones data with coordinates
  const zones = [
    { 
      id: 1, 
      name: 'Hairpin Bend A', 
      risk: 'high', 
      accidents: 12,
      position: { lat: 6.9271, lng: 79.8612 },
      radius: 500 // meters
    },
    { 
      id: 2, 
      name: 'Mountain Pass B', 
      risk: 'medium', 
      accidents: 8,
      position: { lat: 6.9320, lng: 79.8570 },
      radius: 300
    },
    { 
      id: 3, 
      name: 'Steep Curve C', 
      risk: 'high', 
      accidents: 15,
      position: { lat: 6.9350, lng: 79.8650 },
      radius: 400
    }
  ];

  const mapStyles = {
    height: '600px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 6.9271,
    lng: 79.8612
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="map-container">
      <div className="map-content">
        <div className="map-card">
          <BackButton />
          <h2 className="map-title">Accident Risk Zones Map</h2>
          
          <div className="map-grid">
            {/* Google Maps Integration */}
            <div className="md:col-span-2">
              <LoadScript googleMapsApiKey="AIzaSyDxZq74_kDlP7lhHsyVm8Jk1FK9pMNSFE0">
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={defaultCenter}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {zones.map((zone) => (
                    <React.Fragment key={zone.id}>
                      <Marker
                        position={zone.position}
                        onClick={() => setSelectedZone(zone)}
                      />
                      <Circle
                        center={zone.position}
                        radius={zone.radius}
                        options={{
                          fillColor: zone.risk === 'high' ? '#ff0000' : '#ffaa00',
                          fillOpacity: 0.3,
                          strokeColor: zone.risk === 'high' ? '#ff0000' : '#ffaa00',
                          strokeOpacity: 0.8,
                          strokeWeight: 2,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>

            {/* Zone List */}
            <div className="zone-list">
              <h3 className="zone-title">High Risk Zones</h3>
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="zone-card"
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="flex items-center space-x-3">
                    <FiMapPin className={`zone-icon ${zone.risk === 'high' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{zone.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {zone.accidents} accidents reported
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone Details */}
          {selectedZone && (
            <div className="zone-details">
              <div className="details-content">
                <FiInfo className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="details-title">
                    {selectedZone.name} Details
                  </h3>
                  <p className="details-text">
                    Risk Level: <span className="details-value">{selectedZone.risk.toUpperCase()}</span>
                  </p>
                  <p className="details-text">
                    Total Accidents: <span className="details-value">{selectedZone.accidents}</span>
                  </p>
                  <p className="details-text">
                    Radius: <span className="details-value">{selectedZone.radius}m</span>
                  </p>
                  <div className="mt-4">
                    <button className="action-button">
                      View Detailed Statistics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccidentMap;