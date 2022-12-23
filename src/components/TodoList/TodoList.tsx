import React, { useEffect } from 'react';

import { fetchTodos } from '../../store/todo';
import {
  selectTodoInProgress,
  selectCompletedTodo,
  selectIncompletedTodo
} from '../../store/todo/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoPanel } from '../TodoPanel/TodoPanel';

export const TodoList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todoInProgress = useAppSelector((state) => selectTodoInProgress(state));
  const completedTodo = useAppSelector((state) => selectCompletedTodo(state));
  const incompletedTodo = useAppSelector((state) => selectIncompletedTodo(state));

  return (
    <div className={styles.root}>
      <div>
        <TodoPanel />
      </div>
      {completedTodo.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
      {todoInProgress.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
      {incompletedTodo.map((todo) => (
        <TodoItem todo={todo} key={todo?.id} />
      ))}
    </div>
  );
};
