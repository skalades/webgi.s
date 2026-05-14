import React from 'react'
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../../services/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isLoggedIn()) {
    // Jika tidak login, lempar ke halaman login
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
