import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'


const Reset = () => {

    const { username } = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')




    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: ''
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {

            let resetPromise = resetPassword({ username, password: values.password })

            toast.promise(resetPromise, {
                loading: 'Updating...',
                success: <b>Reset Successfully...!</b>,
                error: <b>Could not Reset!</b>
            });

            resetPromise.then(function () { navigate('/password') })

        }
    })


    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if (status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>




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
                                        enter new password
                                    </span>
                                </div>


                                <form onSubmit={formik.handleSubmit}>

                                    <input  {...formik.getFieldProps('password')} type="password" placeholder="New password" className="form-control mb-4" />
                                    <input  {...formik.getFieldProps('confirm_pwd')} type="password" placeholder="Repeat password" className="form-control mb-4" />

                                    <button type="submit" className="btn w-100 btn-sm btn-primary mb-4">Reset</button>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Reset
