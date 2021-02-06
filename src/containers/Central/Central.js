import React, { Component } from 'react';
import styles from './Central.module.css';
import MessageLogger from './MessageLogger/MessageLogger';

class Central extends Component {

  render () {
    return (
        <div className={styles.Central}>
          <div className={styles.display}>
            <div></div>
          </div>
          <MessageLogger/>
        </div>
    );
  }
}

export default Central;