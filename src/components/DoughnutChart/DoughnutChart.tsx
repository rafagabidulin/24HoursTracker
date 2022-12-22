import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styles from './DoughnutChart.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectTodoArrayEntities } from '../../store/todo/selectors';
import { fetchTodos } from '../../store/todo';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodoArrayEntities);

  useEffect(() => {
    dispatch(fetchTodos);
  }, []);

  const newData = {
    labels: todos.reduce((acc: any, item: any) => {
      acc.push(item.title);
      return acc;
    }, []),
    datasets: [
      {
        label: 'Duration',
        data: todos.reduce((acc: any, item: any) => {
          acc.push(item.duration);
          return acc;
        }, []),
        backgroundColor: todos.reduce((acc: any, item: any) => {
          acc.push(item.backgroundColor);
          return acc;
        }, []),
        borderColor: todos.reduce((acc: any, item: any) => {
          acc.push(item?.borderColor);
          return acc;
        }, []),
        borderWidth: 1
      }
    ],
    date: new Date().toLocaleString()
  };

  return (
    <div className={styles.root}>
      <div className={styles.doughnut_chart__title}>
        <h1>{newData.date}</h1>
      </div>
      <div className={styles.doughnut_chart__body}>
        <Doughnut data={newData} />
      </div>
    </div>
  );
};
