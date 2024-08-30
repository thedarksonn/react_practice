import React from 'react'


const EmptyCard = ({ imgsrc, message }) => {
    return (
        <>

            <div className='text-center'>
                <img src={imgsrc} className='img-fluid mb-2' style={{ height: "150px" }} />
                <p>{message}</p>
            </div>

        </>
    )
}

export default EmptyCard