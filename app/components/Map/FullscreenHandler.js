import 'leaflet.fullscreen';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet.fullscreen/dist/Control.FullScreen.css';
import L from 'leaflet';

export default function FullscreenHandler() {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const fullscreenControl = L.control.fullscreen({
        position: 'topleft',
        title: 'Afficher en plein écran',
        titleCancel: 'Quitter le mode plein écran',
      });
      fullscreenControl.addTo(map);
    }
    return () => {
      if (map) {
        map.removeControl(map.fullscreenControl);
      }
    };
  }, [map]);

  return null;
}