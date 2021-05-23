import React from 'react';
import styles from './NotifMessage.module.css';

const notifMessage = (props) => {
  return (
    <div className={styles.NotifMessage}>
      <div className={styles.logo}>
        <h2>Desde {props.central}</h2>
      </div> 
      <h1 className={styles.title}>Dispositivo {props.id} en {props.status}</h1>
    </div> 
  );
}

export default notifMessage;