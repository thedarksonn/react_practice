import React from 'react'

const Spiner = () => {
    return (
        <>
            <div className='fixed inset-0 bg-black z-[9999] flex items-center justify-center opacity-50'>
                <div className='w-10 h-10 border-2 border-dashed border-white border-t-transparent rounded-full animate-spin'></div>
            </div>
        </>
    )
}

export default Spiner