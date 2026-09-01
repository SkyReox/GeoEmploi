import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React from 'react';

function Map() {
    return (
        <MapContainer center={[52.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

const MemoizedMap = React.memo(Map);

export default MemoizedMap;
