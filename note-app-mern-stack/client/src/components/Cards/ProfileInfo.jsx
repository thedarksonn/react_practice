import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({ userInfo, onLogout }) => {
    return (
        <>
            <li className="nav-item dropdown" style={{ listStyle: "none" }}>
                <div className="nav-link cursor-pointer  d-flex align-items-center justify-content-center  text-primary bg-white" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    style={{ width: "12px", height: "12px", padding: "25px", borderRadius: "50%", fontWeight: "bolder" }}>
                    {getInitials(userInfo?.fullName)}
                </div>
                <ul className="dropdown-menu border-0 shadow">
                    <li><a className="dropdown-item text-capitalize" style={{ fontWeight: "bolder" }}>{userInfo?.fullName}</a></li>
                    <li><a className="dropdown-item  cursor-pointer" onClick={onLogout}>logout</a></li>
                </ul>
            </li>

        </>
    )
}

export default ProfileInfo