import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, setToken } from '../services/auth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const token = await login(username, password)
      setToken(token)
      navigate('/admin')
    } catch (err: any) {
      setError(err.message || 'Gagal login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-forest-dark text-white font-sans items-center justify-center">
      <div className="bg-forest-panel border border-emerald-glow/20 rounded-lg p-8 w-96">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-wider text-emerald-glow/70 font-mono">Restricted Access</p>
          <h1 className="text-2xl font-bold tracking-tight">ADMIN LOGIN</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1 font-mono">USERNAME</label>
            <input 
              type="text" 
              className="w-full bg-forest-dark border border-emerald-glow/20 rounded p-2 text-white text-sm focus:border-emerald-glow outline-none" 
              placeholder="admin" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1 font-mono">PASSWORD</label>
            <input 
              type="password" 
              className="w-full bg-forest-dark border border-emerald-glow/20 rounded p-2 text-white text-sm focus:border-emerald-glow outline-none" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-xs font-mono">{error}</p>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-glow text-forest-dark font-bold py-2 rounded uppercase text-xs hover:bg-emerald-glow/90 transition-colors mt-6 font-mono disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-600 mt-6 font-mono">
          &copy; 2026 DEPARTEMEN KEHUTANAN DIGITAL
        </p>
      </div>
    </div>
  )
}

export default Login
