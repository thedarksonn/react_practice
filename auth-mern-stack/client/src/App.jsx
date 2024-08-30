import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Main from './components/main'
import Signup from './components/signup'
import Signin from './components/login'

const App = () => {
  const user = localStorage.getItem("tokem")
  return (
    <>
      <Routes>
        {user && <Route path='/' exact element={<Main />} />}
        <Route path='/register' exact element={<Signup />} />
        <Route path='/login' exact element={<Signin />} />
        <Route path='/' exact element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  )
}

export default App