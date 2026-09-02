import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import React, { useState } from 'react';

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate({ enableHighAccuracy: true })
    },
    locationfound(e) {
      console.log('Accuracy:', e.accuracy, 'meters');
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
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

function Map() {
  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '100vh', width: '100%' }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.ign.fr/">IGN</a>'
        url="https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

const MemoizedMap = React.memo(Map);

export default MemoizedMap;