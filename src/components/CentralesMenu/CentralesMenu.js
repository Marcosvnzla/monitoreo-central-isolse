import React from 'react';
import Spinner from '../UI/Spinner/Spinner';
import styles from './CentralesMenu.module.css';

const centralesMenu = (props) => {
  const classes = [styles.Menu];
  const centrales = [];

  if (props.centrales) {
    for (let key of props.centrales) {
      centrales.push(<li className={styles.MenuItem} key={props.centrales.indexOf(key)} >{key}</li>);
    }
  }

  if (props.menuState) {
    classes.push(styles.show);
  }

  return (
    <li className={styles.NavigationItem} onClick={props.clicked}>
      <div>Centrales</div>
      <ul className={classes.join(' ')}>
        {props.centrales ? centrales : <Spinner />}
      </ul>
    </li>
  );
}

export default centralesMenu;