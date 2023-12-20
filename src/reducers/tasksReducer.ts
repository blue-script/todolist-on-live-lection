import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const tasksReducer = (state: TaskType[], action: TasksReducerType): TaskType[] => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return state.filter(t => t.id != action.payload.id);
    }
    case 'ADD-TASK': {
      return [...state, {id: v1(), isDone: false, title: action.payload.title}]
    }
    default: return state
  }
}

type TasksReducerType = RemoveTaskACType | AddTaskAC
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id:id
    }
  } as const
}
type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {title}
  } as const
}