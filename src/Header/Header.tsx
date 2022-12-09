import React from 'react';

import styles from './Header.module.css';

export const Header = () => (
  <div className={styles.root}>
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h3>24HoursTracker</h3>
      </div>
    </header>
  </div>
);
