import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useFeatures } from '../../hooks/useFeatures'

function MapArea() {
  // Posisi default [latitude, longitude] - Contoh: Area Kalimantan (Hutan)
  const position: [number, number] = [-0.789275, 113.921327] 
  const { features, loading, error } = useFeatures()

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: '#0A110B' }} // Sesuai tema saat loading
      >
        {/* Basemap Citra Satelit (Esri World Imagery) sesuai desain */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Render GeoJSON data dari backend */}
        {features.map(feature => (
          feature.geom && (
            <GeoJSON 
              key={feature.id} 
              data={feature.geom}
              style={{
                color: '#10B981', // Emerald glow
                weight: 2,
                opacity: 0.8,
                fillColor: '#10B981',
                fillOpacity: 0.2
              }}
              onEachFeature={(featureData, layer) => {
                layer.bindPopup(`<b>${feature.name}</b><br/>Type: ${feature.type}`);
              }}
            />
          )
        ))}
      </MapContainer>

      {/* Indikator Loading */}
      {loading && (
        <div className="absolute top-4 right-4 bg-forest-panel/90 p-2 rounded border border-emerald-glow/20 text-xs font-mono text-white z-[1000]">
          Memuat data spasial...
        </div>
      )}

      {/* Indikator Error */}
      {error && (
        <div className="absolute top-4 right-4 bg-red-900/90 p-2 rounded border border-red-500/20 text-xs font-mono text-white z-[1000]">
          Error: {error}
        </div>
      )}

      {/* Koordinat real-time placeholder (Z-index tinggi agar di atas peta) */}
      <div className="absolute bottom-4 left-4 bg-forest-panel/90 p-2 rounded border border-emerald-glow/20 text-xs font-mono text-white z-[1000]">
        Lat: -0.7893, Lng: 113.9213
      </div>
    </div>
  )
}

export default MapArea
