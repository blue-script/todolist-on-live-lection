import {
  AddTaskArgs,
  TaskType,
  todolistsAPI,
  UpdateTaskArgs,
  UpdateTaskModelType,
} from "features/TodolistsList/todolists-api"
import { AppThunk } from "app/store"
import { appActions } from "app/app.reducer"
import { todolistsActions } from "features/TodolistsList/todolists.reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"

import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { TaskPriorities, TaskStatuses } from "common/enums"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
  },
})

// thunks
const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[]
    todolistId: string
  },
  string
>(`${slice.name}/fetchTasks`, async (todolistId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items
    dispatch(appActions.setAppStatus({ status: "succeeded" }))
    return { tasks, todolistId }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await todolistsAPI.createTask(arg)
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { task }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    try {
      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        //throw new Error("task not found in the state");
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      }

      const res = await todolistsAPI.updateTask({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        domainModel: apiModel,
      })
      if (res.data.resultCode === 0) {
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(tasksActions.removeTask({ taskId, todolistId }))
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

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask }
