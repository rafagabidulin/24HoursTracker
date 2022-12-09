import React from 'react';

import styles from './PieChart.module.css';

export const Piechart = () => (
  <div className={styles.root}>
    <div className={styles.pie_chart__title}>
      <h3>Pie chart</h3>
    </div>
    <div className={styles.pie_chart__img}>
      <img src='./images/pie-chart.png' alt='pie_chart' />
    </div>
  </div>
);
