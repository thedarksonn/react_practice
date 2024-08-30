import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'



const Signup = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)


    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter a name")
            return
        }
        setError("")


        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return
        }

        if (!password) {
            setError("Please enter a password")
            return
        }
        setError("")

        // signup api call
        try {
            const response = await axiosInstance.post('/create-account', {
                fullName: name,
                email: email,
                password: password
            })

            // handle succesfull signup
            if (response.data && response.data.error) {
                setError(response.data.message)
                return
            }

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
                            <h4 className='mb-4 bold mt-4'>Signup</h4>

                            <form onSubmit={handleSignup}>

                                <div className="input-group mb-3">
                                    <div className="input-group-text"></div>
                                    <input
                                        type="text"
                                        className="form-control p-2"
                                        placeholder='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

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
                                    <button type='submit' className='btn btn-sm btn-primary p-2 ' style={{ width: "100%", fontSize: "14px", fontWeight: "bold" }}> create account </button>
                                </div>

                                <p className='text-center text-capitalize'>already a  member? <Link to="/login" className='btn btn-link text-primary text-decoration-none'>login</Link></p>


                            </form>


                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Signup