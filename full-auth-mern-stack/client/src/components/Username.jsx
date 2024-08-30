import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';

import { usernameValidate } from '../helper/validate'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useAuthStore } from '../store/store'


const Username = () => {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);


    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setUsername(values.username);
            navigate('/password')
            console.log(values)
        }
    })




    return (
        <>


            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

                <Toaster position='top-center' reverseOrder={false}></Toaster>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">

                            <div className="d-inline-block bg-dark shadow-primary-xs rounded p-4 p-md-5 w-100 max-w-450 text-align-start">

                                <div className="text-center mb-3">
                                    <span className='text-white'>
                                        Explore More by connecting with us.
                                    </span>
                                </div>


                                <form onSubmit={formik.handleSubmit}>
                                    <div className='d-flex justify-content-center py-4'>
                                        <img src={avatar} className="img-fluid" alt="avatar" style={{ height: '100px', borderRadius: "50%" }} />
                                    </div>

                                    <input  {...formik.getFieldProps('username')} type="text" placeholder="username" className="form-control mb-4" />

                                    <button type="submit" className="btn w-100 btn-sm btn-primary mb-4">Let's Go</button>
                                    <span className='text-white'>Not a member? <Link to="/register" className="text-white"> Register</Link></span>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Username