import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    RESULT_CODE,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setError, SetErrorType, setRequestStatus, SetRequestStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatus('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setRequestStatus('succeeded'))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatus('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setRequestStatus('succeeded'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setRequestStatus('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
            const task = res.data.data.item
            const action = addTaskAC(task)
            dispatch(action)
            dispatch(setRequestStatus('succeeded'))
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<SimpleErrorType>(err)) {
            handleServerNetworkError(dispatch, err)
        } else {
            // (err as Error).message
            handleServerNetworkError(dispatch, (err as Error))
        }
        // err have type unknown end it need to be typed below
        // handleServerNetworkError(dispatch, (err as {message: string}))
    }

    // todolistsAPI.createTask(todolistId, title)
    //     .then(res => {
    //         if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
    //             const task = res.data.data.item
    //             const action = addTaskAC(task)
    //             dispatch(action)
    //             dispatch(setRequestStatus('succeeded'))
    //         } else {
    //             handleServerAppError<{item: TaskType}>(res.data, dispatch)
    //         }
    //     })
    //     // type e
    //     .catch((e: AxiosError<SimpleErrorType>)  => {
    //         e.response?.data
    //         handleServerNetworkError(dispatch, e)
    //     })
}
type SimpleErrorType = {
    statusCode: number
    messages: [
        {
            message: string
            field: string
        },
        string
    ]
    error: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setRequestStatus('loading'))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(setRequestStatus('succeeded'))
                } else {
                    res.data.messages.length
                        ? dispatch(setError(res.data.messages[0]))
                        : dispatch(setError('some error'))
                    dispatch(setRequestStatus('failed'))
                }
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err)
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | SetRequestStatusType
    | SetErrorType
