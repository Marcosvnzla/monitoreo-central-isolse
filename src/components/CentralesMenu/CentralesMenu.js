import React from 'react';
import Spinner from '../UI/Spinner/Spinner';
import styles from './CentralesMenu.module.css';

const centralesMenu = (props) => {
  const centrales = [];

  if (props.centrales) {
    for (let key of props.centrales) {
      centrales.push(<li key={props.centrales.indexOf(key)} >{key}</li>);
    }
  }

  return (
    <li className={styles.NavigationItem} onClick={props.clicked}>
      <div>Centrales</div>
      <ul>
        {props.centrales ? centrales : <Spinner />}
      </ul>
    </li>
  );
}

export default centralesMenu;