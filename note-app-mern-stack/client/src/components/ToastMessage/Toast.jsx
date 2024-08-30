import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import './style.css';

const Toast = ({ isShown, message, type, onClose }) => {
    useEffect(() => {
        if (isShown) {
            const timeoutId = setTimeout(() => {
                onClose();
            }, 3000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isShown, onClose]);

    return (
        <>
            {isShown && (
                <div className={`toastt ${type === 'delete' ? 'error' : 'success'}`}>
                    <div className="outer-container">
                        <div className='i'>
                            {type === 'delete' ? (<MdDeleteOutline />) : (<LuCheck />)}
                        </div>
                    </div>
                    <div className="inner-container">
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;
