import React from 'react';
import styles from './Message.module.css';

const message = (props) => {
  return (
    <div className={styles.Message}>
      <ul className={styles.statusBar}>
        <li>{props.position}</li>
        <li>{props.id}</li>
        <li>{props.date}</li>
      </ul>
      {props.message}
    </div>
  );
}

export default message;