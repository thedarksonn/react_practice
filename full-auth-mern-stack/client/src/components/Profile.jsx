
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/convert';
import { profileValidation } from '../helper/validate'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'




const Profile = () => {

    const [file, setFile] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            email: apiData?.email || '',
            mobile: apiData?.mobile || '',
            address: apiData?.address || ''
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || apiData?.profile || '' })
            let updatePromise = updateUser(values);

            toast.promise(updatePromise, {
                loading: 'Updating...',
                success: <b>Update Successfully...!</b>,
                error: <b>Could not Update!</b>
            });

        }
    })

    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    // logout handler function
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/')
    }

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
                                        you can update the details
                                    </span>
                                </div>


                                <form onSubmit={formik.handleSubmit}>
                                    <div className='d-flex justify-content-center py-4'>

                                        <label htmlFor='profile'>
                                            <img src={apiData?.profile || file || avatar} className="img-fluid" alt="avatar" style={{ height: '100px', borderRadius: "50%", cursor: "pointer" }} />
                                        </label>
                                        <input onChange={onUpload} type='file' id='profile' name='profile' style={{ width: "100%", display: "none", }} />

                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'><input  {...formik.getFieldProps('firstName')} type="text" placeholder="firstname" className="form-control mb-4" /></div>
                                        <div className='col-md-6'><input  {...formik.getFieldProps('lastName')} type="text" placeholder="lastname" className="form-control mb-4" /></div>
                                        <div className='col-md-6'><input  {...formik.getFieldProps('mobile')} type="text" placeholder="mobile no" className="form-control mb-4" /></div>
                                        <div className='col-md-6'><input  {...formik.getFieldProps('email')} type="email" placeholder="email*" className="form-control mb-4" /></div>
                                        <div className='col-md-6'><input  {...formik.getFieldProps('address')} type="text" placeholder="Address" className="form-control mb-4" /></div>
                                        <div className='col-md-6'><button type="submit" className="btn w-100 btn-sm btn-primary mb-4 p-2">Update</button></div>
                                    </div>


                                    <span className='text-white'>Come back later <button onClick={userLogout} className="btn btn-sm text-danger">Logout</button></span>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Profile
