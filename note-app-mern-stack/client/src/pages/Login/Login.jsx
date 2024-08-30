import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return
        }

        if (!password) {
            setError("Please enter a password")
            return
        }
        setError("")


        // login api call
        try {
            const response = await axiosInstance.post('/login', {
                email: email,
                password: password
            })

            // handle succesfull login
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate('/dashboard')
            }

        } catch (error) {

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("an unexpected error occured. please try again")
            }
        }

    }


    return (

        <>

            <Navbar />

            <div className='container py-5 bg-light rounded' style={{ marginTop: "100px" }}>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-4'>
                        <div className='card  border-0 p-4 rounded'>
                            <h4 className='mb-4 bold mt-4'>Login</h4>

                            <form onSubmit={handleLogin}>

                                <div className="input-group mb-3">
                                    <div className="input-group-text"></div>
                                    <input
                                        type="email"
                                        className="form-control p-2"
                                        placeholder='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <PasswordInput
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {error && <p className='text-danger small pb-1'>{error}</p>}

                                <div className="mb-3">
                                    <button type='submit' className='btn btn-sm btn-primary p-2' style={{ width: "100%", fontSize: "14px", fontWeight: "bold" }}>login</button>
                                </div>

                                <p className='text-center text-capitalize'>not yet a member? <Link to="/signup" className='btn btn-link text-primary text-decoration-none'>create an account</Link></p>


                            </form>


                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Login