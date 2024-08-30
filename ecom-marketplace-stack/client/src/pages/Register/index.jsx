import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'
import { RegisterUser } from '../../apicalls/users'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setLoader } from '../../redux/LoaderSlice'








const Register = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const rules = [
        {
            required: true,
            message: 'required'
        },
    ]

    const onFinish = async (values) => {
        // console.log("success", values)
        try {
            dispatch(setLoader(true))
            const response = await RegisterUser(values)
            dispatch(setLoader(false))
            if (response.success) {
                message.success(response.message)
                window.location.href = '/login'
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false))
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/');
        }
    }, [])



    return (
        <>
            <div className='h-screen bg-primary flex justify-center items-center'>
                <div className='bg-white p-5 rounded w-[450px]'>

                    <h1 className='text-primary text-xl'> MARKET PLACE
                        <span className='text-gray-400'> REGISTER </span>
                    </h1>
                    <Divider />
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item label='Name' name='name' rules={rules} >
                            <Input placeholder='Name' />
                        </Form.Item>
                        <Form.Item label='Email' name='email' rules={rules} >
                            <Input placeholder='Email' />
                        </Form.Item>
                        <Form.Item label='Password' name='password' rules={rules} >
                            <Input placeholder='Password' type='password' />
                        </Form.Item>

                        <Button type='primary' htmlType='submit'
                            block className='mt-2'
                        >
                            Register
                        </Button>

                        <div className='mt-5 text-center'>
                            <span className='text-gray-500'> Already have an account <Link to="/login" className='text-primary'>Login</Link></span>
                        </div>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Register