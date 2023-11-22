import React, {useState} from 'react';
import Button from './Button';
import {TaskType, TodoListPropsType} from './TodoList';

type TasksListPropsType = {
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
}

type FilterValueType = 'all' | 'active' | 'completed'

const TasksList: React.FC<TasksListPropsType> = ({tasks, removeTask}) => {
  const [filter, setFilter] = useState('all')
  const filteredTasks: Array<TaskType> = filter === 'active'
    ? tasks.filter(t => !t.isDone) : filter === 'completed'
      ? tasks.filter(t => t.isDone) : tasks

  const listItems: JSX.Element = !filteredTasks.length
    ? <span>Your tasks list is empty</span>
    : <ul>
      {
        filteredTasks.map((t: TaskType) => {
          const onClickRemoveTask = () => removeTask(t.id)
          return <li>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <Button name="x" onClickHandler={onClickRemoveTask}/>
          </li>
        })
      }
    </ul>

  const onClickSetAllFilter = () => setFilter('all')
  const onClickSetActiveFilter = () => setFilter('active')
  const onClickSetCompletedFilter = () => setFilter('completed')
  return (
    <div className="tasksList">
      {listItems}
      <div>
        <Button name="All" onClickHandler={onClickSetAllFilter}/>
        <Button name="Active" onClickHandler={onClickSetActiveFilter}/>
        <Button name="Completed" onClickHandler={onClickSetCompletedFilter}/>
      </div>
    </div>
  );
};

export default TasksList;