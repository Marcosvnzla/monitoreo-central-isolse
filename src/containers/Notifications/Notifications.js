import React, { Component, Fragment } from 'react';
import { connect, shallowEqual } from 'react-redux';
import NotifMessage from './NotifMessage/NotifMessage';
import firebase from '../../Firebase';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import styles from './Notifications.module.css';

class Notifications extends Component {
  state = {
    showNotifications: false,
    abnormalDevices: null
  }

  componentDidUpdate (prevProps) {
    if (!shallowEqual(this.props.centrales, prevProps.centrales)) {
      this.setFirebaseReference();
    }
  }

  showNotifications = () => {
    this.setState(prevState => {
      return {showNotifications: !prevState.showNotifications}
    });
  }

  setFirebaseReference = () => {
    if (this.props.centrales) {
      for (const key of this.props.centrales) {
        const abnormalDevices = firebase.database().ref(`${this.props.userId}/${key}/Abnormal_Devices`);
        abnormalDevices.on('value', (snapshot) => {
          const data = snapshot.val();
          const abnormal = {...this.state.abnormalDevices};
          abnormal[key] = data;
          this.setState({abnormalDevices: abnormal});
          if (data) {
            this.notificationsAlert(key);
          }
        }, error => {console.log(error)});
      }
    }
  }

  notificationsAlert = (notificationCentral) => {
    console.log(Notification.permission);
    if (Notification.permission === 'granted') {
      new Notification(`Alerta en ${notificationCentral}`, {body: `Dispositivos anormales en ${notificationCentral}`});
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission()
      .then( permission => {
        console.log(permission);
      });
    }
  }

  render () {
    const classes = [styles.Menu];
    
    if (this.state.showNotifications) {
      classes.push(styles.show);
    }

    let abDevicesList = [];
    const devicesArray = [];
    for (let key in this.state.abnormalDevices) {
      for (let el in this.state.abnormalDevices[key]) {
        devicesArray.push({...this.state.abnormalDevices[key][el], from: key});
      }
    }
    abDevicesList = devicesArray.map((device, index) => {
      return (
        <NotifMessage key={new Date() + index} central={device.from} status={device.status} id={device.id} />
      );
    });

    return (
      <Fragment>
        <Backdrop show={this.state.showNotifications} clicked={this.showNotifications} />
        <li className={styles.NavigationItem} onClick={this.showNotifications}>
          <div className={styles.title}>Notificaciones</div>
          <ul className={classes.join(' ')}>
            {this.state.abnormalDevices ? abDevicesList : <h1 style={{fontFamily: 'Montserrat', color: '#8BDC6E'}}>Sin notificaciones</h1>}
          </ul>
        </li>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    centrales: state.centrales
  }
}

export default connect(mapStateToProps)(Notifications);