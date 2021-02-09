import React from 'react';
import styles from './ImageContainer.module.css';

const imageContainer = (props) => {
  return (
    <div className={styles.ImageContainer} style={props.moreStyles} onClick={props.clicked}>
      <img src={props.imageImport} />
    </div>
  );
}

export default imageContainer;