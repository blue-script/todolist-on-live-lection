import React, { ChangeEvent, useState } from 'react'
import Button from './Button'
import { TaskType } from './TodoList'

type TasksListPropsType = {
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
}

type FilterValueType = 'all' | 'active' | 'completed'

const TasksList: React.FC<TasksListPropsType> = ({
	tasks,
	removeTask,
	changeTaskStatus,
}) => {
	const [filter, setFilter] = useState<FilterValueType>('all')

	const filteredTasks: Array<TaskType> =
		filter === 'active'
			? tasks.filter(t => !t.isDone)
			: filter === 'completed'
			? tasks.filter(t => t.isDone)
			: tasks

	const listItems: JSX.Element = !filteredTasks.length ? (
		<span>Your tasks list is empty</span>
	) : (
		<ul className='list'>
			{filteredTasks.map((t: TaskType) => {
				const onClickRemoveTask = () => removeTask(t.id)
				const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
					changeTaskStatus(t.id, e.currentTarget.checked)
				}
				return (
					<li className={t.isDone ? 'task-done' : 'task'}>
						<input
							type='checkbox'
							checked={t.isDone}
							onChange={onChangeSetTaskStatus}
						/>
						<span>{t.title}</span>
						<Button name='x' onClickHandler={onClickRemoveTask} />
					</li>
				)
			})}
		</ul>
	)

	const onClickSetAllFilter = () => setFilter('all')
	const onClickSetActiveFilter = () => setFilter('active')
	const onClickSetCompletedFilter = () => setFilter('completed')

	return (
		<div className='tasksList'>
			{listItems}
			<div className='btns-container'>
				<Button
					classes={filter === 'all' ? 'btn-active' : 'btn'}
					name='All'
					onClickHandler={onClickSetAllFilter}
				/>
				<Button
					classes={filter === 'active' ? 'btn-active' : 'btn'}
					name='Active'
					onClickHandler={onClickSetActiveFilter}
				/>
				<Button
					classes={filter === 'completed' ? 'btn-active' : 'btn'}
					name='Completed'
					onClickHandler={onClickSetCompletedFilter}
				/>
			</div>
		</div>
	)
}

export default TasksList
