import React, { Component } from 'react';
import { connect, shallowEqual } from 'react-redux';
import firebase from '../../Firebase';
import styles from './Central.module.css';
import MessageLogger from './MessageLogger/MessageLogger';
import Message from './Message/Message';
import Spinner from '../../components/UI/Spinner/Spinner';
import ventilacionImg from '../../assets/images/ventilacion_central.svg';
import lockImg from '../../assets/images/central_lock.svg';
import boltImg from '../../assets/images/central_bolt.svg';
import * as actions from '../../store/actions/index';

class Central extends Component {
  state = {
    deviceInfo: '',
    abnormalDevices: null
  }

  componentDidMount () {
    this.props.onGetCentrales(this.props.userId, this.props.token);
    this.setFirebaseReference();
  }

  componentDidUpdate (prevProps) {
    if (!shallowEqual(this.props.currentCentral, prevProps.currentCentral)) {
      this.setFirebaseReference();
    }
  }

  setFirebaseReference = () => {
    const abnormalDevices = firebase.database().ref(`${this.props.userId}/${this.props.currentCentral}/Abnormal_Devices`);
    abnormalDevices.on('value', (snapshot) => {
      const data = snapshot.val();
      this.setState({abnormalDevices: data})
    }, error => {console.log(error)});
  }

  render () {

    const abnormalDevicesArray = [];
    let abnormalDevicesList = [];
    if (this.state.abnormalDevices !== null) {
      for (let key in this.state.abnormalDevices) {
        abnormalDevicesArray.push(this.state.abnormalDevices[key]);
      }

      abnormalDevicesList = abnormalDevicesArray.map((device, index) => {
        return (
          <Message type={device.type}
                   status={device.status}
                   position={`${index + 1} de ${abnormalDevicesArray.length}`}
                   date={device.date}
                   id={device.id}
                   name={device.name}
                   fuego={device.status}
                   key={index} />
        );
      });
    }

    return (
        <div className={styles.Central}>
          <div className={styles.container}>
            <h1 className={styles.title}>Central seleccionada: {this.props.currentCentral.toUpperCase()}</h1>
            <div className={styles.display}>
              <div className={styles.messageContainer}>
                {abnormalDevicesList[0] ? abnormalDevicesList[0] : <Spinner/>}
                <div className={styles.lockImg} style={{backgroundImage: `url(${lockImg})`}}></div>
                <div className={styles.boltImg} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg2} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg3} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg4} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg5} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg6} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg7} style={{backgroundImage: `url(${boltImg})`}}></div>
                <div className={styles.boltImg8} style={{backgroundImage: `url(${boltImg})`}}></div>
              </div>
              <div className={styles.ventilacionImg} style={{backgroundImage: `url(${ventilacionImg})`}}></div>
              <div className={styles.ventilacionImg2} style={{backgroundImage: `url(${ventilacionImg})`}}></div>
            </div>
          </div>
          <MessageLogger messageList={abnormalDevicesList}/>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    token: state.token,
    currentCentral: state.currentCentral
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCentrales: (uid, token) => dispatch(actions.getCentrales(uid, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Central);