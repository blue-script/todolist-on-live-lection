import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TasksType = {
  [id: string]: TaskType[]
}

function App() {
  let id1 = v1()
  let id2 = v1()

  let [todolists, setTodolists] = useState<TodolistsType[]>([
    {id: id1, title: 'What to learn', filter: 'all'},
    {id: id2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [id1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [id2]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  });

  function removeTodolists(todolistId: string) {
    setTodolists(todolists.filter(tl=> tl.id !== todolistId))
    delete tasks[todolistId]
  }
  function removeTask(todolistId: string, id: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != id)})
  }

  function addTask(todolistId: string, title: string) {
    let task = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
  }

  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId
        ? {...t, isDone: isDone}
        : t)
    });
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
  }

  return (
    <div className="App">
      {todolists.map(tl => {

        return <Todolist key={tl.id}
                         id={tl.id}
                         title={tl.title}
                         tasks={tasks[tl.id]}
                         removeTask={removeTask}
                         removeTodolists={removeTodolists}
                         changeFilter={changeFilter}
                         addTask={addTask}
                         changeTaskStatus={changeStatus}
                         filter={tl.filter}
        />
      })}
    </div>
  );
}

export default App;
