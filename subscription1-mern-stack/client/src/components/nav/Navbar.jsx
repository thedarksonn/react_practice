import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context'


const Navbar = () => {

    const [state, setState] = useContext(UserContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        setState({ data: null, loading: false, error: null })
        localStorage.removeItem("token")
        navigate("/")
    }

    
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">@Subsub</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/" className="nav-link">About</Link></li>
                            <li className="nav-item"><Link to="/" className="nav-link">Contact</Link></li>
                            {
                                state.data && (
                                    <button className="btn btn-sm btn-danger" onClick={handleLogout}>Logout</button>
                                )

                            }
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar