
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { passwordValidate } from '../helper/validate'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';


const Password = () => {

    const navigate = useNavigate();
    const { username } = useAuthStore(state => state.auth)
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {

            let loginPromise = verifyPassword({ username, password: values.password })
            toast.promise(loginPromise, {
                loading: 'Checking...',
                success: <b>Login Successfully...!</b>,
                error: <b>Password Not Match!</b>
            });

            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token);
                navigate('/profile')
            })
        }
    })


    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>


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
                                        Hello {apiData?.firstName || apiData?.username}
                                    </span>
                                </div>


                                <form onSubmit={formik.handleSubmit}>
                                    <div className='d-flex justify-content-center py-4'>
                                        <img src={apiData?.profile || avatar} className="img-fluid" alt="avatar" style={{ height: '100px', borderRadius: "50%" }} />
                                    </div>

                                    <input  {...formik.getFieldProps('password')} type="password" placeholder="password" className="form-control mb-4" />


                                    <button type="submit" className="btn w-100 btn-sm btn-primary mb-4">Sign In</button>
                                    <span className='text-white'>Forgot password? <Link to="/recovery" className="text-white"> Recover Now</Link></span>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Password




