import React from 'react';
import NavItem from './NavItem/NavItem';
import styles from './NavItems.module.css';

const navItems = (props) => {
  return (
    <ul className={styles.NavItems} style={props.moreStyles}>
      <NavItem clicked={props.clicked} link="/">Central</NavItem>
      <NavItem clicked={props.clicked} link="/dataLoader">Cargar Datos</NavItem>
      <NavItem clicked={props.clicked} link="/logout">Salir</NavItem>
    </ul>
  );
}

export default navItems;