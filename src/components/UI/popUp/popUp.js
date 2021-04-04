import React from 'react';
import styles from './popUp.module.css';

const popUp = (props) => {
  return (
    <p className={styles.popUp}>{props.message}</p>
  );
}

export default popUp;