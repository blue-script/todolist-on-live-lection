import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';

// CRUD create read+ update delete+

function App() {
  //-- BLL business logic layer - это наши данные и логика их изменений :
  const TodoListTitle: string = 'What to learn'

  // state
  // const tasks: Array<TaskType> = [
  //   {id: 1, title: "HTML", isDone: true},
  //   {id: 2, title: "JS/ES6", isDone: false},
  //   {id: 3, title: "React", isDone: false},
  // ]

  const [tasks, setTasks] = useState<Array<TaskType>>([ // initial state
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'JS/ES6', isDone: false},
    {id: 3, title: 'React', isDone: false},
  ])

  // delete
  const removeTask = (taskId: number) => {
    const nextState: Array<TaskType> = []
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== taskId) nextState.push(tasks[i])
    }
    setTasks(nextState)
  }

//-- UI user interface :
  return (
    <div className="App">
      <TodoList
        title={TodoListTitle}
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  )
}

export default App;
