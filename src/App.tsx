import React from 'react';
import { TodoProvider } from './utils';
import { Header } from './Header/Header';
import { Piechart } from './PieChart/Piechart';
import { TodoList } from './TodoList/TodoList';
import { TodoPanel } from './TodoPanel/TodoPanel';

export const App = () => (
  <TodoProvider>
    <div>
      <Header />
      <Piechart />
      <TodoPanel mode='add' />
      <TodoList />
    </div>
  </TodoProvider>
);
