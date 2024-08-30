import React from 'react'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


import './task.css'
const Task = ({ id, title }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transition, transform: CSS.Transform.toString(transform), };


    return (
        <>

            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="task">
                <input type="checkbox" className="checkbox" />
                {title}
            </div>


        </>
    )
}

export default Task