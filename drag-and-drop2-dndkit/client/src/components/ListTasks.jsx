import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDrag, useDrop } from 'react-dnd'


const ListTasks = ({ tasks, setTasks }) => {

    const [todos, setTodos] = useState([])
    const [inprogress, setInprogress] = useState([])
    const [closed, setClosed] = useState([])

    useEffect(() => {

        const ftodos = tasks.filter(task => task.status === "todo")
        const finprogress = tasks.filter(task => task.status === "inprogress")
        const fclosed = tasks.filter(task => task.status === "closed")

        setTodos(ftodos)
        setInprogress(finprogress)
        setClosed(fclosed)

    }, [tasks])


    const statuses = ["todo", "inprogress", "closed"]



    return (
        <>
            <div className='mb-4 row mt-4'>
                {statuses.map((status, index) => (
                    <Section key={index} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inprogress={inprogress} closed={closed} />
                ))}
            </div>

        </>
    )
}

export default ListTasks



const Section = ({ status, tasks, setTasks, todos, inprogress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemtosection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))


    let text = 'todo'
    let bg = 'bg-info'
    let tasksToMap = todos


    if (status === "inprogress") {
        text = "in progresss"
        bg = "bg-warning"
        tasksToMap = inprogress
    }

    if (status === "closed") {
        text = "closed"
        bg = "bg-primary"
        tasksToMap = closed
    }


    const addItemtosection = (id) => {

        setTasks(prev => {

            const mtasks = prev.map(t => {
                if (t.id == id) {
                    return { ...t, status: status }
                }

                return t
            })
            localStorage.setItem("tasks", JSON.stringify(mtasks))
            toast.success("task status updated")
            return mtasks
        })

    }



    return (
        <>
            <div ref={drop} className={`col-md-4 mt-4 rounded ${isOver ? "bg-white" : ""}`}>
                <Header text={text} bg={bg} count={tasksToMap.length} />
                {tasksToMap.length > 0 && tasksToMap.map(task => <SingleTask key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
            </div>

        </>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <>

            <div className={`${bg} d-flex  justify-content-start gap-2 text-center p-3 rounded text-uppercase bold mb-4`}>
                {text}
                <div className='bg-white p-1 rounded small'>{count}</div>
            </div>

        </>
    )
}




const SingleTask = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    const handleremove = (id) => {
        const ftasks = tasks.filter(t => t.id != id)
        localStorage.setItem("tasks", JSON.stringify(ftasks))
        setTasks(ftasks)
        toast("Task removed", { icon: ":)" })
    }


    return (
        <>

            <div ref={drag} className={`p-4  shadow rounded  pointer m-2 ${isDragging ? "opacity-50" : "opacity-100"}`} style={{ cursor: "pointer" }}>
                <p>{task.name}</p>
                <div className='text-end'>
                    <button onClick={() => handleremove(task.id)} className='btn btn-sm btn-danger border-0'>x</button>
                </div>
            </div>

        </>
    )
}

