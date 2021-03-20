import React from 'react';
import styles from './Backdrop.module.css';

const backdrop = (props) => {
  const classes = [styles.Backdrop];
  if (props.invisible) {
    classes.push(styles.invisible);
  }

  return props.show ? <div className={classes.join(' ')}  onClick={props.clicked}></div> : null;
}

export default backdrop;