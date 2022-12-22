import React from 'react';
import { Button } from '../Button/Button';
import { deleteTodo, TodoState } from '../../store/todo';
import { useAppDispatch } from '../../hooks/hooks';

import styles from './TodoItem.module.css';

interface TodoProps {
  todo: TodoState | undefined;
}

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (todoId: any) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className={styles.todo_item_container}>
      <div className={styles.todo_item_title}>{todo?.title}</div>
      <div className={styles.todo_item_description}>{todo?.description}</div>
      <div>Duration: {todo?.duration} hours</div>
      <div className={styles.todo_item_button_container}>
        <Button color='orange'>EDIT</Button>
        <Button color='red' onClick={() => handleDeleteTodo(todo?.id)}>
          DELETE
        </Button>
      </div>
    </div>
  );
};
