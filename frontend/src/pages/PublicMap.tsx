import { useState } from 'react'
import MapArea from '../components/map/MapArea'

function PublicMap() {
  return (
    <div className="flex flex-col h-screen bg-forest-dark text-white font-sans p-4">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-glow/70 font-mono">Sistem Informasi Geografis</p>
          <h1 className="text-2xl font-bold tracking-tight">PEMANTAUAN HUTAN <span className="font-extrabold">NUSANTARA</span></h1>
        </div>
        
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="text-right">
            <span className="text-gray-500 block">LATITUDE</span>
            <span className="text-emerald-glow">6.22° S</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 block">LONGITUDE</span>
            <span className="text-emerald-glow">106.8508° E</span>
          </div>
          <button className="border border-emerald-glow text-emerald-glow px-4 py-2 rounded uppercase text-xs hover:bg-emerald-glow/10 transition-colors">
            Live Telemetry
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="w-72 flex flex-col gap-4 overflow-y-auto pr-2">
          {/* Card: Filter Monitoring */}
          <div className="bg-forest-panel border border-emerald-glow/20 rounded-lg p-4">
            <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Filter Monitoring</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-glow"></span> All
                </span>
                <span className="text-emerald-glow">●</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Flora
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span> Fauna
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Station
              </div>
            </div>
          </div>

          {/* Card: Statistik Kawasan */}
          <div className="bg-forest-panel border border-emerald-glow/20 rounded-lg p-4">
            <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Statistik Kawasan</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">TOTAL AREA TERPANTAU</p>
                <p className="text-xl font-mono font-bold">1.771.5 <span className="text-xs text-gray-500">HA</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">INDEKS KERAPATAN</p>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-glow h-full" style={{ width: '82.4%' }}></div>
                </div>
                <p className="text-right text-xs text-emerald-glow mt-1 font-mono">82.4% (Sangat Padat)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">TITIK MONITORING</p>
                <p className="text-xl font-mono font-bold">4 <span className="text-xs text-gray-500">STATIONS</span></p>
              </div>
            </div>
          </div>

          {/* Card: Quick Jump */}
          <div className="bg-forest-panel border border-emerald-glow/20 rounded-lg p-4">
            <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Quick Jump</h3>
            <ul className="text-xs space-y-2 text-gray-400">
              <li className="hover:text-emerald-glow cursor-pointer">North Sanctuary Forest</li>
              <li className="hover:text-emerald-glow cursor-pointer">East Production Block</li>
              <li className="hover:text-emerald-glow cursor-pointer">Coastal Mangrove Zone</li>
            </ul>
          </div>
        </div>

        {/* CENTER COLUMN (MAP) */}
        <div className="flex-1 bg-forest-panel border border-emerald-glow/20 rounded-lg overflow-hidden relative">
          <MapArea />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-72 flex flex-col bg-forest-panel border border-emerald-glow/20 rounded-lg p-4">
          <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Log Aktivitas</h3>
          
          <div className="flex-1 overflow-y-auto space-y-3 text-xs">
            <div className="border-l-2 border-emerald-glow pl-2 py-1">
              <p className="text-gray-500 font-mono">14:20:05</p>
              <p className="font-semibold">Patroli Drone Terjadwal Selesai</p>
              <p className="text-gray-400 text-xs">Blok Kalimantan Tengah</p>
            </div>
            <div className="border-l-2 border-orange-500 pl-2 py-1">
              <p className="text-orange-500 font-mono">13:45:12</p>
              <p className="font-semibold">Anomali Panas Terdeteksi</p>
              <p className="text-gray-400 text-xs">Koordinat 0.92S 114.1E</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-2 py-1">
              <p className="text-blue-500 font-mono">11:10:00</p>
              <p className="font-semibold">Update Citra Sentinel-2</p>
              <p className="text-gray-400 text-xs">Resolusi 10m/pixel</p>
            </div>
          </div>

          <button className="w-full bg-emerald-glow text-forest-dark font-bold py-2 rounded mt-4 uppercase text-xs hover:bg-emerald-glow/90 transition-colors">
            Ekspor Laporan PDF
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="flex justify-between items-center mt-4 text-xs font-mono text-gray-500 border-t border-emerald-glow/10 pt-2">
        <div className="flex gap-4">
          <span>SYSTEM STATUS: <span className="text-emerald-glow">STABLE</span></span>
          <span>SENSORS: <span className="text-emerald-glow">ACTIVE (4)</span></span>
          <span>LATENCY: <span className="text-emerald-glow">22ms</span></span>
        </div>
        <div>
          <span>© 2026 DEPARTEMEN KEHUTANAN DIGITAL | REGION: ASIA-PACIFIC / INDONESIA</span>
        </div>
      </footer>
    </div>
  )
}

export default PublicMap
