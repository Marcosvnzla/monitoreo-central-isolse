import React from 'react';
import NavItem from './NavItem/NavItem';
import CentralesMenu from '../../CentralesMenu/CentralesMenu';
import styles from './NavItems.module.css';

const navItems = (props) => {
  return (
    <ul className={styles.NavItems} style={props.moreStyles}>
      <NavItem clicked={props.clicked} link="/">Central</NavItem>
      <CentralesMenu centrales={props.centrales} clicked={props.centralesClicked} menuState={props.centralesMenuState} />
      <NavItem clicked={props.clicked} link="/dataLoader">Cargar Datos</NavItem>
      <NavItem clicked={props.clicked} link="/logout">Salir</NavItem>
    </ul>
  );
}

export default navItems;