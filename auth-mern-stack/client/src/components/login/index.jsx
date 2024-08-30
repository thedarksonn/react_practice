import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

const Signin = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState('')

    const handleChnage = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/"
            console.log(res.message)

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }

    }

    return (
        <>

            <div className='container'>
                <div className='row d-flex justify-content-between align-items-center'>

                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center text-dark mt-5">Welcome Back</h2>
                        <div className="text-center mb-5 text-dark"> <Link to="/register" className='btn btn-primary'>Sign up</Link></div>
                        <div className="card my-5">
                            <form className="card-body cardbody-color  p-lg-5">
                                <div className="mb-3">
                                    <input type="email" name='email' className="form-control" value={data.email} onChange={handleChnage} required placeholder='email' />
                                </div>
                                <div className="mb-3">
                                    <input type="password" name='password' className="form-control" value={data.password} onChange={handleChnage} required  placeholder='password'/>
                                </div>
                                {error && <div className="error_msg">{error}</div>}
                                <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={handleSubmit}>Sign in</button></div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}

export default Signin