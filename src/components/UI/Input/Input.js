import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
  const classes = [styles.InputElement]
  if (props.invalid && props.shouldValidate && props.touched) {
    classes.push(styles.Invalid);
  }

  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = <input className={classes.join(' ')} onChange={props.changed} value={props.value} />
      break;
  
    case 'textarea': 
      inputElement = <textarea className={classes.join(' ')} onChange={props.changed} value={props.value} />
      break;

    case 'select':
      inputElement = (
        <select className={classes.join(' ')} onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map(option => {
            return <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
          })}
        </select>
      );
      break;
  
    default:
      inputElement = <input className={classes.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value} />
      break;
  }

  return(
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;