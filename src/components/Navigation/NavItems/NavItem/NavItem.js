import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavItem.module.css';

const navItem = (props) => {
  return (
    <li className={styles.NavigationItem}>
      <NavLink to={props.link} onClick={props.clicked} exact activeClassName={styles.active}>{props.children}</NavLink>
    </li>
  );
}

export default navItem;