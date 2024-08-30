import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Register from './pages/Register/index'
import Profile from './pages/Profile/index'

import ProtecttedRoute from './components/ProtecttedRoute'
import Spiner from './components/Spiner'



const App = () => {

  const { loading } = useSelector(state => state.loaders)

  return (
    <>

      {loading && <Spiner />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtecttedRoute><Home /></ProtecttedRoute>} />
          <Route path='/profile' element={<ProtecttedRoute><Profile /></ProtecttedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App