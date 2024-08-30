
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store'
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'



const Recovery = () => {

    const { username } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        generateOTP(username).then((OTP) => {
            console.log(OTP)
            if (OTP) return toast.success('OTP has been send to your email!');
            return toast.error('Problem while generating OTP!')
        })
    }, [username]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code: OTP })
            if (status === 201) {
                toast.success('Verify Successfully!')
                return navigate('/reset')
            }
        } catch (error) {
            return toast.error('Wront OTP! Check email again!')
        }
    }

    // handler of resend OTP
    function resendOTP() {

        let sentPromise = generateOTP(username);

        toast.promise(sentPromise,
            {
                loading: 'Sending...',
                success: <b>OTP has been send to your email!</b>,
                error: <b>Could not Send it!</b>,
            }
        );

        sentPromise.then((OTP) => {
            console.log(OTP)
        });

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
                                        Enter 6 digit otp send to you email address to recover password
                                    </span>
                                </div>


                                <form onSubmit={onSubmit}>
                                    <input onChange={(e) => setOTP(e.target.value)} type="text" placeholder="otp" className="form-control mb-4" />


                                    <button type="submit" className="btn w-100 btn-sm btn-primary mb-4">Sign In</button>
                                    <span className='text-white'>Can't get otp? <button onClick={resendOTP} className="btn btn-sm text-danger "> Resend </button></span>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Recovery

