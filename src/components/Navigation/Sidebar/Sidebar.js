import React from 'react';
import NavItems from '../NavItems/NavItems';
import { motion } from 'framer-motion';
import styles from './Sidebar.module.css';

import smallLogo from '../../../assets/images/small_logo.png';

const toolbar = (props) => {
  return (
    <nav className={styles.Toolbar}>
      <div className={styles.ImageContainer} onClick={props.logoClicked}>
        <img src={smallLogo}/>
      </div>
      <NavItems />
    </nav>
  );
}

export default toolbar;