import React from 'react'

import Signin from '../auth/Signin'
import Signup from '../auth/Signup'

const Hero = () => {
    return (
        <>
            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Welcome to Sub Sub!</h1>
                        <p className="lead mb-0">The Largest Subscription webApp</p>
                        <div className="p-4">
                            <Signin />
                            <Signup />
                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}

export default Hero