import React from 'react'

import './style.css'
const Navigation = () => {
    return (
        <>

            <div className="row">
                <div className="col-sm-12">

                    <div className="profile-user-box card-box bg-custom">
                        <div className="row">
                            <div className="col-sm-6"><span className="float-left mr-3"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="thumb-lg rounded-circle" /></span>
                                <div className="media-body text-white">
                                    <h4 className="mt-1 mb-1 font-18">Michael A. Franklin</h4>
                                    <p className="font-13 text-light">User Experience Specialist</p>
                                    <p className="text-light mb-0">California, United States</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="text-right">
                                    <button type="button" className="btn btn-light waves-effect"><i className="mdi mdi-account-settings-variant mr-1"></i> Edit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Navigation