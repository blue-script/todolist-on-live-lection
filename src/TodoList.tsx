import React, {FC} from 'react';
import Button from "./Button";
import Task from "./Task";
import TasksList from './TasksList';
import task from './Task';

export type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
}

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({title, tasks, removeTask}) => {
  // 1. старый способ
  // const title = props.title
  // const tasks: Array<TaskType> = props.tasks
  // 2. современный способ
  // const {title: title, tasks: tasks} = props
  // 3. еще более усовершенствованный
  // const {title, tasks} = props

  // const listItems: Array<JSX.Element> = []
  // for (let i = 0; i < tasks.length; i++) {
  //   const onClickRemoveTask = () => removeTask(tasks[i].id)
  //   const listItem: JSX.Element = <li>
  //     <input type="checkbox" checked={tasks[i].isDone}/>
  //     <span>{tasks[i].title}</span>
  //     <Button name='x' onClickHandler={onClickRemoveTask}/>
  //   </li>
  //   listItems.push(listItem)
    // listItems.push(<Task {...tasks[i]} />)
  // }

  return (
      <div className="todoList">
        <h3>{title}</h3>
        <div>
          <input/>
          <Button name="+" onClickHandler={()=>{}}/>
        </div>

        <TasksList tasks={tasks} removeTask={removeTask}/>

        {/*<ul>*/}
        {/*  {listItems}*/}
        {/*</ul>*/}
        {/*<div>*/}
        {/*  <Button name="All" onClickHandler={()=>{}}/>*/}
        {/*  <Button name="Active" onClickHandler={()=>{}}/>*/}
        {/*  <Button name="Completed" onClickHandler={()=>{}}/>*/}
        {/*</div>*/}
      </div>
  )
}

export default TodoList