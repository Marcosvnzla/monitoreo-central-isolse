import React from 'react';
import problemaBgImg from '../../../assets/images/problema_card_bg.svg';
import alarmaBgImg from '../../../assets/images/alarma_card_bg.svg';
import flameImg from '../../../assets/images/flame.svg';
import styles from './MessageCard.module.css';

const messageLogger = (props) => {
  const classes = [styles.MessageCard]
  if (props.fuego === 'FUEGO') {
    classes.push(styles.Alarma);
  }

  return (
    <div className={classes.join(' ')} onClick={props.clicked} indexkey={props.indexkey} style={{backgroundImage: `url(${props.fuego === 'FUEGO' ? alarmaBgImg : problemaBgImg})`}}>
      {props.fuego === 'FUEGO' ? <img className={styles.flame} src={flameImg} /> : null}
      <p>{props.id}</p>
      <div className={styles.counter}>
        <p>{props.position}</p>
      </div>
    </div>
  );
}

export default messageLogger;