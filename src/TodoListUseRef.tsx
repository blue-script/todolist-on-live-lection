import React, {FC, useRef} from 'react';
import Button from "./Button";
import TasksList from './TasksList';

export type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({title, tasks, removeTask, addTask}) => {
  const taskTitleInput = useRef<HTMLInputElement>(null)

  const onClickAddTask = () => {
    if (taskTitleInput.current) {
      addTask(taskTitleInput.current.value)
      taskTitleInput.current.value = ''
    }
  }

  return (
      <div className="todoList">
        <h3>{title}</h3>
        <div>
          <input ref={taskTitleInput}/>
          <Button name="+" onClickHandler={onClickAddTask}/>
        </div>

        <TasksList tasks={tasks} removeTask={removeTask}/>
      </div>
  )
}

export default TodoList