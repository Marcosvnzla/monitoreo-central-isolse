import React from 'react';
import styles from './Footer.module.css';
import teslabLogoImg from '../../assets/images/teslab_logo.svg';

const footer = (props) => {
  return (
    <div className={styles.footer} style={props.style}>
      <img src={teslabLogoImg}/>
      <p>Powered by Teslab</p>
    </div>
  );
}

export default footer;