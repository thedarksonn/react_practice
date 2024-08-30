import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'


const App = () => {

  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);


  return (

    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='container mt-4 bg-light text-center p-4'>
        <div className='p-3 gap-4'>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  )
}

export default App