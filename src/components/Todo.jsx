function Todo({ task, deleteTask, uppercaseTask, markDone }) {
  const taskClass = 'task' + (task.done ? ' done' : '')

  return (
    <div className={taskClass}>
      <span>{task.text}</span>
      <div className="actions">
        <button onClick={() => deleteTask(task.id)}>delete</button>
        <button onClick={() => uppercaseTask(task.id)}>UpperCase One</button>
       <button onClick={() => markDone(task.id)}>
  {task.done ? "Mark Undone" : "Mark Done"}
</button>
      </div>
    </div>
  )
}

export default Todo