import { RootState } from '..';

export const selectTodoModuleState = (state: RootState) => state.todo;

export const selectTodoIds = (state: RootState) => selectTodoModuleState(state).ids;

export const selectTodoEntities = (state: RootState) => selectTodoModuleState(state).entities;

export const selectTodoArrayEntities = (state: RootState) =>
  Object.values(selectTodoEntities(state));

export const selectTodoInProgress = (state: RootState) =>
  selectTodoArrayEntities(state).filter((todo) => todo?.inProgress);

export const selectCompletedTodo = (state: RootState) =>
  selectTodoArrayEntities(state).filter((todo) => todo?.completed);

export const selectIncompletedTodo = (state: RootState) =>
  selectTodoArrayEntities(state).filter((todo) => !todo?.completed && !todo?.inProgress);
