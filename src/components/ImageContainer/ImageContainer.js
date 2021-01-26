import React from 'react';
import styles from './Logo.module.css';

const imageContainer = (props) => {
  return (
    <div className={styles.Logo} style={props.moreStyles}>
      <img src={props.imageImport} alt="logo" />
    </div>
  );
}

export default imageContainer;