import React from 'react';
import NavItems from '../NavItems/NavItems';
import styles from './Sidebar.module.css';
import smallLogo from '../../../assets/images/small_logo.png';
import ImageContainer from '../../ImageContainer/ImageContainer';

const toolbar = (props) => {
  return (
    <nav className={styles.Toolbar}>
      <ImageContainer clicked={props.logoClicked} imageImport={smallLogo} moreStyles={{margin: '0px', flexGrow: '2'}} />
      <NavItems />
    </nav>
  );
}

export default toolbar;