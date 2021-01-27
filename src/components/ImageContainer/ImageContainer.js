import React from 'react';
import styles from './ImageContainer.module.css';

const imageContainer = (props) => {
  return (
    <div className={styles.ImageContainer} style={props.moreStyles}>
      <img src={props.imageImport} alt="logo" />
    </div>
  );
}

export default imageContainer;