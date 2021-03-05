import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Firebase';
import styles from './Central.module.css';
import MessageLogger from './MessageLogger/MessageLogger';
import Message from './Message/Message';
import Spinner from '../../components/UI/Spinner/Spinner';

class Central extends Component {
  state = {
    deviceInfo: '',
    abnormalDevices: null
  }

  componentDidMount () {
    const abnormalDevices = firebase.database().ref(`${this.props.userId}/Abnormal_Devices`);
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
    console.log(abnormalDevicesList);

    return (
        <div className={styles.Central}>
          <div className={styles.display}>
            <div className={styles.messageContainer}>
              {abnormalDevicesList[0] ? abnormalDevicesList[0] : <Spinner/>}
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
    token: state.token
  }
}

export default connect(mapStateToProps)(Central);