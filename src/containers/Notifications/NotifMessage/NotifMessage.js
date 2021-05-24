import React from 'react';
import miniCentralImg from '../../../assets/images/mini_central_icon.svg';
import styles from './NotifMessage.module.css';

const notifMessage = (props) => {
  return (
    <div className={styles.NotifMessage}>
      <div className={styles.from}>
        <img className={styles.logo} src={miniCentralImg}/>
        <h2>Desde {props.central}</h2>
      </div> 
      <h1 className={styles.title}>Dispositivo <strong>{props.id}</strong> en <strong>{props.status}</strong></h1>
    </div> 
  );
}

export default notifMessage;