import React, { Component } from 'react';
import { connect, shallowEqual } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import firebase from '../../Firebase';
import styles from './Central.module.css';
import MessageLogger from './MessageLogger/MessageLogger';
import Message from './Message/Message';
import MessageCard from './MessageCard/MessageCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import bigLogoImg from '../../assets/images/bigLogo_img.png';
import noEventsImg from '../../assets/images/no_events_bg_img.svg';
import ventilacionImg from '../../assets/images/ventilacion_central.svg';
import lockImg from '../../assets/images/central_lock.svg';
import boltImg from '../../assets/images/central_bolt.svg';
import * as actions from '../../store/actions/index';

class Central extends Component {
  state = {
    deviceInfo: '',
    abnormalDevices: null,
    messageIndex: 0,
    popUpMessages: []
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
      const devicesArray = [];
      /* 
        for (let key in data) {
          for (const el of data[key]) {
            devicesArray.push(el);
          }
        }
      */
      for (let key in data) {
        devicesArray.push(data[key]);
      }
      this.setState({abnormalDevices: devicesArray});
      this.setAlarmMessageFirst(devicesArray);
    }, error => {console.log(error)});
  }

  setDisplayMessage = (e) => {
    const messageIndex = e.currentTarget.getAttribute('indexkey');
    this.setState({messageIndex: messageIndex});
  }

  createMessageForDisplay = (messageIndex) => {
    const device = this.state.abnormalDevices[messageIndex];

    if (!device && (this.state.abnormalDevices.length !== 0)) {
      return (<p>Seleccione un mensaje para mostrar</p>);
    } else if (this.state.abnormalDevices.length === 0) {
      return (
        <div className={styles.noEvents} style={{backgroundImage: `url(${noEventsImg})`}}>
          <img src={bigLogoImg} />
          <h2>Sistema Normal</h2>
        </div>
      );
    }

    return (
      <Message type={device.type}
                status={device.status}
                date={device.date}
                id={device.id}
                name={device.name}
                fuego={device.status}
                />
    );
  }

  setAlarmMessageFirst = (abnormalDevices) => {
    const prevMessages = [...abnormalDevices];
    for (const el of prevMessages) {
      if (!el) {
        return;
      }

      if (el.status === 'ALARMA' || el.status === 'FUEGO') {
        prevMessages.splice(prevMessages.indexOf(el), 1);
        prevMessages.splice(0, 0, el);
      }
    }
    this.setState({abnormalDevices: prevMessages});
  }

  onDragEnd = (result) => {
    const {destination, source} = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const prevArray = JSON.parse(JSON.stringify(this.state.abnormalDevices));
    prevArray.splice(source.index, 1);
    prevArray.splice(destination.index, 0, this.state.abnormalDevices[source.index]);

    this.setState({abnormalDevices: prevArray});
    this.setState({messageIndex: prevArray.indexOf(prevArray[0])});
  }

  render () {

    let abnormalDevicesList = [];
    if (this.state.abnormalDevices !== null) {

      abnormalDevicesList = this.state.abnormalDevices.map((device, index) => {
        return (
          <MessageCard type={device.type}
                   ack={device.ack} //ack signigica si esta chequeado en la central el mensaje.
                   status={device.status}
                   position={`${index + 1} de ${this.state.abnormalDevices.length}`}
                   date={device.date}
                   deviceid={device.id}
                   name={device.name}
                   fuego={device.status}
                   clicked={this.setDisplayMessage.bind(this)}
                   indexkey={index}
                   key={index} />
        );
      });
    }

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <motion.div 
          className={styles.Central}
          initial={{opacity: 0.5}}
          animate={{opacity: 1, animationDuration: '2s'}}
          exit={{opacity: 0.1}}
        >
          <div className={styles.container}>
            <h1 className={styles.title}>Central seleccionada: {this.props.currentCentral.toUpperCase()}</h1>
            <div className={styles.display}>
              <div className={styles.messageContainer}>
                {this.state.abnormalDevices ? this.createMessageForDisplay(this.state.messageIndex) : <Spinner/>}
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
        </motion.div>
      </DragDropContext>
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