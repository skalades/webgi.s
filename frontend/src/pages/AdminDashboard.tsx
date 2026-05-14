import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/auth'

function AdminDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-screen bg-forest-dark text-white font-sans p-4">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-glow/70 font-mono">Control Panel</p>
          <h1 className="text-2xl font-bold tracking-tight">ADMIN <span className="font-extrabold">DASHBOARD</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-500">Logged in as: <span className="text-emerald-glow">admin</span></span>
          <button 
            onClick={handleLogout}
            className="border border-red-500 text-red-500 px-4 py-2 rounded uppercase text-xs hover:bg-red-500/10 transition-colors font-mono"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* LEFT: Management List */}
        <div className="w-1/3 bg-forest-panel border border-emerald-glow/20 rounded-lg p-4 flex flex-col">
          <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Manajemen Data Spasial</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {/* Mock Items */}
            <div className="bg-forest-dark p-3 rounded border border-emerald-glow/10 hover:border-emerald-glow/30 cursor-pointer">
              <p className="text-sm font-semibold">Pos Pantau Kalimantan</p>
              <p className="text-xs text-gray-500 font-mono">POINT | 113.9213, -0.7892</p>
            </div>
            <div className="bg-forest-dark p-3 rounded border border-emerald-glow/10 hover:border-emerald-glow/30 cursor-pointer">
              <p className="text-sm font-semibold">Blok Hutan Lindung A1</p>
              <p className="text-xs text-gray-500 font-mono">POLYGON | Area: 12500 HA</p>
            </div>
          </div>
          <button className="w-full bg-emerald-glow text-forest-dark font-bold py-2 rounded mt-4 uppercase text-xs hover:bg-emerald-glow/90 transition-colors font-mono">
            + Tambah Fitur Baru
          </button>
        </div>

        {/* RIGHT: Form / Detail Area */}
        <div className="flex-1 bg-forest-panel border border-emerald-glow/20 rounded-lg p-4">
          <h3 className="text-xs uppercase text-emerald-glow mb-3 font-mono">Form Input / Edit</h3>
          <div className="text-gray-500 text-sm text-center mt-20">
            Pilih item di sebelah kiri untuk mengedit, atau klik tombol tambah untuk membuat item baru.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-4 text-xs font-mono text-gray-500 text-center">
        <span>© 2026 DEPARTEMEN KEHUTANAN DIGITAL | ADMIN PANEL</span>
      </footer>
    </div>
  )
}

export default AdminDashboard
