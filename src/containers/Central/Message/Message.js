import React from 'react';
import styles from './Message.module.css';

const message = (props) => {
  const messageClasses = [styles.Message]
  const statBarClasses = [styles.statusBar]

  if (props.fuego === 'FUEGO' || props.fuego === 'ALARMA') {
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
      <div className={styles.messageContainer}>
        {props.type}
        <br/>
        <br/>
        {props.name}
        <br/>
        <br/>
        {props.status}
      </div>
    </div>
  );
}

export default message;