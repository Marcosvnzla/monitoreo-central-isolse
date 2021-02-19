import React from 'react';
import styles from './Message.module.css';

const message = (props) => {
  const messageClasses = [styles.Message]
  const statBarClasses = [styles.statusBar]

  if (props.fuego === 'FUEGO') {
    messageClasses.push(styles.fuegoMessage);
    statBarClasses.push(styles.fuegoBar);
  }

  return (
    <div className={messageClasses.join(' ')}>
      <ul className={statBarClasses.join(' ')}>
        <li>{props.position}</li>
        <li>{props.id}</li>
        <li>{props.date}</li>
      </ul>
      {props.message}
    </div>
  );
}

export default message;