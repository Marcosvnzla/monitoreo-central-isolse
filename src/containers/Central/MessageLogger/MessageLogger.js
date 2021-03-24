import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './MessageLogger.module.css';

const messageLogger = (props) => {

  return (
    <Droppable droppableId="droppable-0">
      {(provided) => {
        return (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.messageLogger}
          >
            {props.messageList}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

export default messageLogger;