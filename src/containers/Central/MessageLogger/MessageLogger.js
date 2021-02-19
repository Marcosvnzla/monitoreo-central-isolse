import React from 'react';
import styles from './MessageLogger.module.css';

const messageLogger = (props) => {
  return (
    <div className={styles.messageLogger}>
      {props.messageList}
    </div>
  );
}

export default messageLogger;