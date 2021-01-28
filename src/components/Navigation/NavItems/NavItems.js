import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.module.css';

const navItems = () => {
  return (
    <ul className={styles.NavItems}>
      <NavItem link="/">Central</NavItem>
    </ul>
  );
}

export default navItems;