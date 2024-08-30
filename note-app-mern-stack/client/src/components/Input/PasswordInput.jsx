import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

const PasswordInput = ({ value, onChange, placeholder }) => {

    const [isShowPassword, setIsShowPassword] = useState("")

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }


    return (
        <>

            <div className="input-group mb-3">
                <div className="input-group-text">
                    {isShowPassword ? (
                        <FaRegEye size={22} className='text-primary cursor-pointer' onClick={() => toggleShowPassword()} />
                    ) : (
                        <FaRegEyeSlash size={22} className='text-primary cursor-pointer' onClick={() => toggleShowPassword()} />
                    )}
                </div>
                <input
                    className="form-control p-2"
                    value={value}
                    onChange={onChange}
                    type={isShowPassword ? "text" : "password"}
                    placeholder={placeholder || "password"}
                />
            </div>

        </>
    )
}

export default PasswordInput