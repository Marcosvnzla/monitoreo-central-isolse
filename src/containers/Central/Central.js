import React, { Component } from 'react';
import styles from './Central.module.css';
import centralIcon from '../../assets/images/central_icon.svg'
import ImageContainer from '../../components/ImageContainer/ImageContainer';
import MessageLogger from './MessageLogger/MessageLogger';

class Central extends Component {
  render () {
    return (
        <div className={styles.Central}>
          <ImageContainer imageImport={centralIcon} moreStyles={{width: '250px', height: '400px', borderRadius: '15px', margin: '0 auto'}}/>
          <MessageLogger/>
        </div>
    );
  }
}

export default Central;