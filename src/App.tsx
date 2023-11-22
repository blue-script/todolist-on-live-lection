import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';

// CRUD create+ read+ update delete+
function App() {
  //-- BLL business logic layer - это наши данные и логика их изменений :
  const TodoListTitle: string = 'What to learn'

  const [tasks, setTasks] = useState<Array<TaskType>>([ // initial state
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'JS/ES6', isDone: false},
    {id: v1(), title: 'React', isDone: false},
  ])

  // delete
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

// create task
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    }
    setTasks([newTask, ...tasks])
  }

//-- UI user interface :
  return (
    <div className="App">
      <TodoList
        title={TodoListTitle}
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  )
}

export default App;
