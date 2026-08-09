import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Builder from '@/pages/Builder'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder/:resumeId" element={<Builder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
