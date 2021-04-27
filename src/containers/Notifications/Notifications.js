import React, { Component, Fragment } from 'react';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import styles from './Notifications.module.css';

class Notifications extends Component {
  state = {
    showNotifications: false
  }

  showNotifications = () => {
    this.setState(prevState => {
      return {showNotifications: !prevState.showNotifications}
    });
  }

  render () {
    const classes = [styles.Menu];
    
    if (this.state.showNotifications) {
      classes.push(styles.show);
    }

    return (
      <Fragment>
        <Backdrop show={this.state.showNotifications} invisible clicked={this.showNotifications} />
        <li className={styles.NavigationItem} onClick={this.showNotifications}>
          <div>Notificaciones</div>
          <ul className={classes.join(' ')}>
            <li>Nofif1</li>
            <li>Nofif1</li>
            <li>Nofif1</li>
            <li>Nofif1</li>
          </ul>
        </li>
      </Fragment>
    );
  }
}

export default Notifications;