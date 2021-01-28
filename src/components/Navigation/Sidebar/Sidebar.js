import React from 'react';
import NavItems from '../NavItems/NavItems';
import styles from './Sidebar.module.css';

const toolbar = () => {
  return (
    <nav className={styles.Toolbar}>
        <NavItems />
    </nav>
  );
}

export default toolbar;