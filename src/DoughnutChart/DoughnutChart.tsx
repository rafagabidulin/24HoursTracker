import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styles from './DoughnutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ data }: { data: any }) => (
  <div className={styles.root}>
    <div className={styles.doughnut_chart__title}>
      <h1>What the plan today?</h1>
    </div>
    <div className={styles.doughnut_chart__body}>
      <Doughnut data={data} />
    </div>
  </div>
);
