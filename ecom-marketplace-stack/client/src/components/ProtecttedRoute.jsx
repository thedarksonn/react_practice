import React, { useState, useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../redux/LoaderSlice';
import { setuser } from '../redux/userSlide';

const ProtecttedRoute = ({ children }) => {


    const { user } = useSelector(state => state.users)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const validateToken = async () => {
        try {
            dispatch(setLoader(true))
            const response = await GetCurrentUser();
            dispatch(setLoader(false))
            if (response.success) {
                dispatch(setuser(response.data))
            } else {
                message.error(response.message);
                navigate('/login');
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {
            navigate('/login');
        }
    }, []);

    return (

        user && (
            <div className=''>
                <div className='flex justify-between items-center bg-primary p-5'>
                    <h1 className='text-2xl text-white'>
                        marekt place
                    </h1>
                    <div className='bg-white py-2 px-5 rounded flex gap-1 items-center'>
                        <i className='ri-shield-user-line'></i>
                        <span className='underline cursor-pointer uppercase'
                            onClick={() => {
                                navigate('/profile')
                            }}
                        >{user.name}</span>
                        <i className='ri-logout-box-r-line ml-10 cursor-pointer'
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate('/login')
                            }}
                        ></i>
                    </div>
                </div>
                <div className='p-5'>{children}</div>
            </div>
        )
    );
};

export default ProtecttedRoute;
