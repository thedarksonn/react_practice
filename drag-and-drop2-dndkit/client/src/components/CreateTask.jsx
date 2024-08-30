import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

const CreateTask = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    })


    const handlesubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3)
            return toast.error("task must have morethan 3 characters")

        if (task.name.length > 100)
            return toast.error("task must not be morethan 100 characters")

        setTasks((prev) => {
            const list = [...prev, task]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("task created")

        setTask({
            id: "",
            name: "",
            status: "todo"
        })

    }


    return (
        <>
            <div className='mb-4'>
                <form className='d-flex' onSubmit={handlesubmit}>
                    <input type='text' className='form-control' value={task.name} onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} />
                    <button type="submit" className='btn btn-sm btn-primary'> create</button>
                </form>
            </div>

        </>
    )
}

export default CreateTask