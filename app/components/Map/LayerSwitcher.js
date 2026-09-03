export const LAYERS = {
  ortho: {
    label: 'Photo aérienne',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
  },
  plan: {
    label: 'Plan IGN',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
  },
  cadastre: {
    label: 'Cadastre',
    url: 'https://data.geopf.fr/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
  },
};

export default function LayerSwitcher({ activeLayer, setActiveLayer }) {
  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', gap: 4 }}>
      {Object.entries(LAYERS).map(([key, { label }]) => (
        <button
          key={key}
          onClick={() => setActiveLayer(key)}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: activeLayer === key ? '2px solid #2563eb' : '1px solid #ccc',
            background: activeLayer === key ? '#e0ecff' : '#fff',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
