import { useState } from 'react';
import { useMap } from 'react-leaflet';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const map = useMap();
  const isFound = suggestions.length > 0;

  async function handleSearch(text) {
    setQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(text)}&limit=5`
    );
    const data = await res.json();
    setSuggestions(data.features || []);
  }

  function flyToFeature(feature) {
    const [lng, lat] = feature.geometry.coordinates;
    console.log('Flying to:', feature.properties.label);
    map.flyTo([lat, lng], 16);
    setQuery(feature.properties.label);
    setSuggestions([]);
  }

  async function handleConfirm() {
    if (!query || query.length < 3) return;

    if (suggestions.length > 0) {
      flyToFeature(suggestions[0]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(query)}&limit=1`
      );
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        flyToFeature(data.features[0]);
      } else {
        alert("Aucune adresse trouvée.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  }

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 50,
      zIndex: 1000,
      width: 320,
    }}>
      <div style={{ display: 'flex', gap: '4px', color: 'black' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher une adresse..."
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#fff',
          }}
        />
        <button
          onClick={handleConfirm}
          disabled={loading}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '...' : 'Rechercher'}
        </button>
      </div>

      {isFound && (
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          maxHeight: 200,
          overflowY: 'auto',
        }}>
          {suggestions.map((f, i) => (
            <li
              key={i}
              onClick={() => flyToFeature(f)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {f.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
}