import React from 'react';
import { useTodo } from '../utils';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoPanel } from '../TodoPanel/TodoPanel';

export const TodoList = () => {
  const { todos, todoIdForEdit, checkTodo, deleteTodo, selectTodoIdForEdit } = useTodo();

  return (
    <div>
      {todos.map((todo) => {
        if (todo.id === todoIdForEdit)
          return (
            <TodoPanel
              key={todo.id}
              mode='edit'
              editTodo={{ name: todo.name, description: todo.description }}
            />
          );

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectTodoIdForEdit={selectTodoIdForEdit}
          />
        );
      })}
    </div>
  );
};
