import React, { useState } from 'react'
import axios from 'axios'

const signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")


    const handleClick = async (e) => {
        e.preventDefault()

        let response;
        const { data: signUpData } = await axios.post("http://localhost:8080/auth/signup", { email, password })
        response = signUpData

        if (response.errors.length) {
            setErrorMsg(response.errors[0].msg)
        }

    }


    return (
        <>

            <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#up">sigin up</button>
            <div className="modal fade" id="up" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Signup</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-start">
                            <form>
                                <div className="mb-3">
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                                </div>
                                {errorMsg && <>
                                    <div className="mb-3">
                                        <p className="alert alert-danger d-flex align-items-center" role="alert">{errorMsg}</p>
                                    </div>
                                </>}
                                <button className="btn  btn-sm btn-primary" onClick={handleClick}>Signup</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default signup