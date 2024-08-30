import React, { useContext } from 'react'
import { UserContext } from '../context'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {

    const [state] = useContext(UserContext)

    if (state.loading) return <div>spinner...</div>

    return state.data ? <Outlet /> : <Navigate to="/" />

}

export default ProtectedRoute