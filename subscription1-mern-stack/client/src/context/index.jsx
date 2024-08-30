import React, { createContext, useState, useEffect } from "react";
import axios from "axios"

const UserContext = createContext([
    {
        data: null,
        loading: true,
        error: null
    },
    () => { }
]);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        data: null,
        loading: true,
        error: null
    })


    const token = localStorage.getItem("token")

    if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`
    }

    const fetchUser = async () => {
        const { data: response } = await axios.get("http://localhost:8080/auth/me")
        if (response.data && response.data.user) {
            setUser({
                data: {
                    id: response.data.user.id,
                    email: response.data.user.email,
                    stripedCustomerId: response.data.user.stripedCustomerId

                },
                loading: false,
                error: null
            })
        } else if (response.data && response.data.errors.length) {
            setUser({
                data: null,
                loading: false,
                error: response.errors[0].msg
            })
        }

    }

    useEffect(() => {
        if (token) {
            fetchUser()
        } else {
            setUser({
                data: null,
                loading: false,
                error: null
            })
        }
    }, [])


    return <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>

}
export { UserContext, UserProvider }


