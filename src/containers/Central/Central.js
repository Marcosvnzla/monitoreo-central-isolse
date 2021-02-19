import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../Firebase';
import styles from './Central.module.css';
import MessageLogger from './MessageLogger/MessageLogger';
import Message from './Message/Message';


class Central extends Component {
  state = {
    deviceInfo: ''
  }

  componentDidMount () {
    const abnormalDevices = firebase.database().ref(`${this.props.userId}/Abnormal_Devices`);
    abnormalDevices.on('value', (snapshot) => {
      const data = snapshot.val();
      const eventDate = `${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}`;
      console.log(eventDate);
      const firstDevice = data[Object.keys(data)[0]];
      firstDevice.date = eventDate;
      this.setState({deviceInfo: firstDevice});
    }, error => {console.log(error)});
  }

  render () {
    return (
        <div className={styles.Central}>
          <div className={styles.display}>
            <div className={styles.messageContainer}>
              <Message message="Test Message" position="1 of 2" date={this.state.deviceInfo.date} id={this.state.deviceInfo.id} />
            </div>
          </div>
          <MessageLogger/>
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