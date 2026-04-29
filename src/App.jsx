import { useState ,useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
import { v4 as uuidv4 } from 'uuid'

function App() {
 const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : []
})
  const [input, setInput] = useState('')



// save tasks to localStorage
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: input.trim(), done: false }])
      setInput('')
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const deleteAll = () => setTasks([])

  const uppercaseTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: task.text.toUpperCase() } : task))
  }

const markDone = (id) => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  ))
}

  const uppercaseAll = () => {
    setTasks(tasks.map(task => ({ ...task, text: task.text.toUpperCase() })))
  }

  const markAllDone = () => {
    setTasks(tasks.map(task => ({ ...task, done: true })))
  }

  return (
    <div className="container">
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="add a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <Todo
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            uppercaseTask={uppercaseTask}
            markDone={markDone}
          />
        ))}
      </div>

      <div className="bulk-actions">
        <button onClick={uppercaseAll}>UpperCase All</button>
        <button onClick={markAllDone}>Mark All Done</button>
         <button onClick={deleteAll}>Delete All</button>
      </div>
    </div>
  )
}

export default App
