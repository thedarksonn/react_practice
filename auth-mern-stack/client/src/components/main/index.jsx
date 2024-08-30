import React from 'react'

const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload();
    }


    return (
        <>

            <div className='container'>
                <div className='row d-flex justify-content-between align-items-center'>

                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center text-dark mt-5">Welcome to home </h2>
                        <button className="btn btn-danger btn-sm" onClick={handleLogout}>logout</button>

                    </div>


                </div>
            </div>

        </>
    )
}

export default Home