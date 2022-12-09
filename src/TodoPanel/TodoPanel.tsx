import React, { useState } from 'react';
import { useTodo } from '../utils';
import { Button } from '../Button/Button';

import styles from './TodoPanel.module.css';

const DEFAULT_TODO = {
  name: '',
  description: ''
};

interface AddTodoPanelProps {
  mode: 'add';
}

interface EditTodoPanelProps {
  mode: 'edit';
  editTodo: Omit<Todo, 'id' | 'checked'>;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const { addTodo, changeTodo } = useTodo();
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isEdit) {
      return changeTodo(todoItem);
    }
    addTodo(todoItem);
    setTodo(DEFAULT_TODO);
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor='name'>
            <div>name</div>
            <input type='text' id='name' name='name' value={todo.name} onChange={onChange} />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor='name'>
            <div>description</div>
            <input
              type='text'
              id='description'
              name='description'
              value={todo.description}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button color='blue' onClick={onClick}>
            ADD
          </Button>
        )}
        {isEdit && (
          <Button color='orange' onClick={onClick}>
            EDIT
          </Button>
        )}
      </div>
    </div>
  );
};
