import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import problemaBgImg from '../../../assets/images/problema_card_bg.svg';
import alarmaBgImg from '../../../assets/images/alarma_card_bg.svg';
import flameImg from '../../../assets/images/flame.svg';
import styles from './MessageCard.module.css';

const messageLogger = (props) => {
  const classes = [styles.MessageCard]
  if (props.fuego === 'FUEGO' || props.fuego === 'ALARMA') {
    classes.push(styles.Alarma);
  }

  if (props.ack) {
    classes.push(styles.Ack);
  }

  if (props.fuego === 'ALARMA' && props.ack) {
    classes.push(styles.AckFuego);
  }

  return (
    <Draggable draggableId={`draggable-${props.indexkey}`} index={props.indexkey}>
      {(provided) => {
        const inlineStyle = {
          backgroundImage: `url(${props.fuego === 'FUEGO' || props.fuego === 'ALARMA' ? alarmaBgImg : problemaBgImg})`,
          ...provided.draggableProps.style
        }

        return (
          <div className={classes.join(' ')}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={props.clicked}
              indexkey={props.indexkey}
              style={inlineStyle}>

            {props.fuego === 'FUEGO' || props.fuego === 'ALARMA' ? <img className={styles.flame} src={flameImg} /> : null}
            <p>{props.deviceid}</p>
            <div className={styles.counter}>
              <p>{props.position}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default messageLogger;