import React from 'react';
import NavItem from './NavItem/NavItem';
import CentralesMenu from '../../CentralesMenu/CentralesMenu';
import Notifications from '../../../containers/Notifications/Notifications';
import Footer from '../../Footer/Footer';
import styles from './NavItems.module.css';

const navItems = (props) => {
  return (
    <ul className={styles.NavItems} style={props.moreStyles}>
      <NavItem clicked={props.clicked} link="/">Central</NavItem>
      <CentralesMenu />
      <NavItem clicked={props.clicked} link="/dataLoader">Cargar Datos</NavItem>
      <Notifications />
      <NavItem clicked={props.clicked} link="/logout">Salir</NavItem>
      <Footer/>
    </ul>
  );
}

export default navItems;