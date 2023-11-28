import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react'
import Button from './Button'
import TasksList from './TasksList'

export type TodoListPropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

const TodoList: FC<TodoListPropsType> = ({
	title,
	tasks,
	removeTask,
	addTask,
	changeTaskStatus,
}) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [inputError, setInputError] = useState(false)
	const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)

	const onClickAddTask = () => {
		const trimmedTitle = newTaskTitle.trim()
		if (trimmedTitle) {
			addTask(newTaskTitle)
      setIsCollapsedTodo(false)
		} else {
			setInputError(true)
		}
		setNewTaskTitle('')
	}
	const maxTitleLengthError = newTaskTitle.length >= 15

	const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
		inputError && setInputError(false)
		if (e.currentTarget.value.length <= 15) {
			setNewTaskTitle(e.currentTarget.value)
		}
	}

	const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
		e.key === 'Enter' &&
			Boolean(newTaskTitle) &&
			newTaskTitle.length < 15 &&
			onClickAddTask()
	}

	const tasksList = (
		<TasksList
			tasks={tasks}
			removeTask={removeTask}
			changeTaskStatus={changeTaskStatus}
		/>
	)

	return (
		<div className='todoList'>
			<h3>{title}</h3>

			<div className='tasksList-info'>
				<div>
					<button onClick={() => setIsCollapsedTodo(!isCollapsedTodo)}>
						{isCollapsedTodo ? 'Show' : 'Hide'}
					</button>
				</div>
				All tasks:<div className='info'>{tasks.length}</div>
			</div>

			<div>
				<input
					value={newTaskTitle}
					onChange={onChangeSetTitle}
					onKeyDown={onKeyDownAddTask}
					className={inputError ? 'inputError' : ''}
				/>
				<Button
					name='+'
					onClickHandler={onClickAddTask}
					disabled={!newTaskTitle || maxTitleLengthError}
				/>
				{maxTitleLengthError && (
					<div style={{ color: 'red' }}>Your task title is too long</div>
				)}
				{inputError && (
					<div style={{ color: 'red' }}>Please input correct title</div>
				)}
			</div>

			{isCollapsedTodo && tasksList}
		</div>
	)
}

export default TodoList
