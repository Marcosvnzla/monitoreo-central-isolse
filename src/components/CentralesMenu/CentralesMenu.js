import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './CentralesMenu.module.css';
import Spinner from '../UI/Spinner/Spinner';

class CentralesMenu extends Component {
  state = {
    showCentralesMenu: false
  }

  showCentralesMenu = () => {
    this.setState(prevState => {
      return {showCentralesMenu: !prevState.showCentralesMenu}
    });
  }

  setCurrentCentral = (clickedCentral) => {
    this.props.onSetCurrentCentral(clickedCentral);

  }

  render () {
    const classes = [styles.Menu];
    const centrales = [];

    if (this.props.centrales) {
      for (let key of this.props.centrales) {
        centrales.push(<li onClick={() => this.setCurrentCentral(this.props.centrales[this.props.centrales.indexOf(key)])} className={styles.MenuItem} key={this.props.centrales.indexOf(key)} >{key}</li>);
      }
    }

    if (this.state.showCentralesMenu) {
      classes.push(styles.show);
    }

    return (
      <li className={styles.NavigationItem} onClick={this.showCentralesMenu}>
        <div>Centrales</div>
        <ul className={classes.join(' ')}>
          {this.props.centrales ? centrales : <Spinner />}
        </ul>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    centrales: state.centrales
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentCentral: (clickedCentral) => {dispatch(actions.setCurrentCentral(clickedCentral))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CentralesMenu);