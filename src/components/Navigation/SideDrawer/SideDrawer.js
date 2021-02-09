import React from 'react';
import styles from './SideDrawer.module.css';
import NavItems from '../NavItems/NavItems';

const sideDrawer = (props) => {
  let classes = [styles.SideDrawer, styles.closed];

  if (props.bstate) {
    classes = [styles.SideDrawer, styles.open];
  }
  
  return (
    <div className={classes.join(' ')}>
      <NavItems moreStyles={{flexDirection: 'column', display: 'flex'}}/>
    </div>    
  );
}

export default sideDrawer;