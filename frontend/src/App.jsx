import { useEffect } from 'react'
import useSocketEvents from './hooks/useSocketEvents'

import NotificationBar from './components/NotificationBar'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initSocket } from './services/socketService'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import AppLayout from './components/AppLayout'
import LoginPage from './pages/LoginPage'

import DashboardPage from './pages/DashboardPage'
import LeadsPage from './pages/LeadsPage'
import RegisterPage from './pages/RegisterPage'
import PipelinePage from './pages/PipelinePage'
import ResourcePage from './pages/ResourcePage'

export default function App() {
  const { token, isAuthenticated } = useSelector(state => state.auth)


  useSocketEvents(token)

  return (
    <Router>
  <NotificationBar />
      <Routes>
  <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <AppLayout>
                <LeadsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pipeline"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PipelinePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path=":group/:name"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ResourcePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}
