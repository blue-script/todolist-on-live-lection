import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import Button from './Button';
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

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const onClickAddTask = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }
  const maxTitleLengthError = newTaskTitle.length >= 15

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length <= 15) {
      setNewTaskTitle(e.currentTarget.value)
    }
  }

  const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>)=>{
    e.key === 'Enter'
    && Boolean(newTaskTitle)
    && newTaskTitle.length < 15
    && onClickAddTask()
  }

  return (
    <div className="todoList">
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeSetTitle}
          onKeyDown={onKeyDownAddTask}
        />
        <Button name="+"
                onClickHandler={onClickAddTask}
                disabled={!newTaskTitle || maxTitleLengthError}/>
        {maxTitleLengthError && <div style={{color: 'red'}}>Your task title is too long</div>}
      </div>

      <TasksList tasks={tasks} removeTask={removeTask}/>
    </div>
  )
}

export default TodoList