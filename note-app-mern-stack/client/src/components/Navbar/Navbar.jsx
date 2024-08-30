import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
    const navigate = useNavigate()

    const onLogout = async () => {
        localStorage.clear()
        navigate('/login')
    }

    const [searchQuery, setSearchQuery] = useState("")
    const handleSearch = async () => {
        if (searchQuery) {
            onSearchNote(searchQuery)
        }
    }

    const onClearSearch = async () => {
        setSearchQuery("")
        handleClearSearch()
    }



    return (
        <>

            <nav className="navbar bg-body-tertiary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand" style={{ fontWeight: "bolder" }}>
                        Notes
                    </Link>

                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => { setSearchQuery(target.value) }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                    />

                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

                </div>
            </nav>

        </>
    )
}

export default Navbar