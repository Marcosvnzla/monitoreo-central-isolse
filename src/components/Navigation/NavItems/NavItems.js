import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.module.css';

const navItems = (props) => {
  return (
    <ul className={styles.NavItems} style={props.moreStyles}>
      <NavItem link="/">Central</NavItem>
      <NavItem link="/dataLoader">Cargar Datos</NavItem>
      <NavItem link="/logout">Salir</NavItem>
    </ul>
  );
}

export default navItems;