import React from 'react';
import styles from './MainDisplay.module.css';

const MainDisplay = (props) => {
  return (
    <div>
      <h1 className={styles.Title}>{props.title}</h1>
      <div className={styles.MainDisplay}>
        {props.children}
      </div>
    </div>
  );
}

export default MainDisplay;