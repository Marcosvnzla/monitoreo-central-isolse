import React from 'react';
import NavItems from '../NavItems/NavItems';
import styles from './Sidebar.module.css';

const toolbar = () => {
  return (
    <div className={styles.Toolbar}>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
}

export default toolbar;