import 'leaflet/dist/leaflet.css';
import SearchBar from './SearchHandler';
import ShowAllJobsButton from './JobHandler';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import React, { useState } from 'react';
import { LAYERS } from './LayerSwitcher';
import LayerSwitcher from './LayerSwitcher';

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      console.log('Accuracy:', e.accuracy, 'meters');
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror(e) {
      console.error('Location error:', e.message);
      alert("Impossible de récupérer votre position.");
    },
  });

  if (!position) {
    return null;
  }

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [41, 41],
      })}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

function LocateButton() {
  const map = useMap();

  function handleClick() {
    map.locate({ enableHighAccuracy: true });
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',
        bottom: 30,
        right: 10,
        zIndex: 1000,
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid #ccc',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}
      title="Me recentrer"
    >
      ➤
    </button>
  );
}

function Map() {
  const [activeLayer, setActiveLayer] = useState('ortho');
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '70vh', width: '100%' }} scrollWheelZoom={true}>
      <TileLayer
        key={activeLayer}
        attribution='&copy; <a href="https://www.ign.fr/">IGN</a>'
        url={LAYERS[activeLayer].url}
      />
      <LayerSwitcher activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      <LocationMarker />
      <LocateButton />
      <SearchBar />
      <ShowAllJobsButton />
    </MapContainer>
  );
}

const MemoizedMap = React.memo(Map);

export default MemoizedMap;