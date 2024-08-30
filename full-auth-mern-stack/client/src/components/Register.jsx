
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/convert';
import { registerValidation } from '../helper/validate'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerUser } from '../helper/helper'


const Register = () => {

    const [file, setFile] = useState();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' })
            let registerPromise = registerUser(values)
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Register Successfully...!</b>,
                error: <b>Could not Register.</b>
            });

            registerPromise.then(function () { navigate('/') });
        }
    })




    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

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
                                        Happy to joint you
                                    </span>
                                </div>


                                <form onSubmit={formik.handleSubmit}>
                                    <div className='d-flex justify-content-center py-4'>

                                        <label htmlFor='profile'>
                                            <img src={file || avatar} className="img-fluid" alt="avatar" style={{ height: '100px', borderRadius: "50%", cursor: "pointer" }} />
                                        </label>
                                        <input onChange={onUpload} type='file' id='profile' name='profile' style={{ width: "100%", display: "none", }} />

                                    </div>

                                    <input  {...formik.getFieldProps('email')} type="email" placeholder="email*" className="form-control mb-4" />
                                    <input  {...formik.getFieldProps('username')} type="text" placeholder="username*" className="form-control mb-4" />
                                    <input  {...formik.getFieldProps('password')} type="password" placeholder="password*" className="form-control mb-4" />


                                    <button type="submit" className="btn w-100 btn-sm btn-primary mb-4">Sign Up</button>
                                    <span className='text-white'>Already have an account? <Link to="/" className="text-white"> Login</Link></span>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Register

