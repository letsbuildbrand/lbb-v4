import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TestimonialsPage from './components/TestimonialsPage.jsx'
import TeamPage from './components/TeamPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/teams" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
