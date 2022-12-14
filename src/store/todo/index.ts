import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import LoadingStatuses from '../../constants/loadingStatuses';
import { selectTodoIds } from './selectors';
import TodoState from '../../types';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async (_, thunkAPI) => {
  if (selectTodoIds(thunkAPI.getState() as RootState).length > 0) {
    return thunkAPI.rejectWithValue(LoadingStatuses.earlyAdded);
  }

  try {
    const response = await axios.get(`http://localhost:3001/todos`);

    return response.data;
  } catch (err) {
    const error = err as AxiosError | Error;
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

export const addTodo = createAsyncThunk('todo/addTodo', async (data: TodoState) => {
  try {
    const response = await axios.post(`http://localhost:3001/todos`, {
      ...data
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError | Error;
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (todoId: number) => {
  await axios.delete(`http://localhost:3001/todos/${todoId}`);
  return todoId;
});

export const updateTodo = createAsyncThunk('todo/updateTodo', async (data: TodoState) => {
  try {
    const response = await axios.put(`http://localhost:3001/todos/${data.id}`, {
      ...data
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError | Error;
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

const todoEntityAdapter = createEntityAdapter<TodoState>();

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todoEntityAdapter.getInitialState({
    status: LoadingStatuses.idle
  }),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        todoEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(addTodo.fulfilled, (state, { payload }) => {
        todoEntityAdapter.addOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(addTodo.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(deleteTodo.fulfilled, (state, id) => {
        todoEntityAdapter.removeOne(state, id);
        state.status = LoadingStatuses.success;
      })
      .addCase(deleteTodo.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        todoEntityAdapter.setOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(updateTodo.rejected, (state, { payload }) => {
        state.status =
          payload === LoadingStatuses.earlyAdded ? LoadingStatuses.success : LoadingStatuses.failed;
      })
});
