import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/nav/Navbar'
import LandingPage from './pages/LandingPage'
import Articles from './pages/Articles'
import ProtectedRoute from './routes/ProtectedRoute'
import ArticlesPlan from './pages/ArticlesPlan'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/" element={<LandingPage />} />

          <Route path="/articles" element={<ProtectedRoute />}>
            <Route path="/articles" element={<Articles />} />
          </Route>

          <Route path="/article-plans" element={<ProtectedRoute />}>
            <Route path="/article-plans" element={<ArticlesPlan />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App