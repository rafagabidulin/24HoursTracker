import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { Header } from './components/Header/Header';
import { DoughnutChart } from './components/DoughnutChart/DoughnutChart';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => (
  <div>
    <Provider store={store}>
      <Header />
      <DoughnutChart />
      <TodoList />
    </Provider>
  </div>
);
