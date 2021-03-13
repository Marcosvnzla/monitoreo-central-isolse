import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './Input.module.css';

const input = (props) => {
  return(
    <div className={styles.Input}>
      <label htmlFor={props.name} className={styles.Label}>{props.label}</label>
      <Field className={styles.InputElement} {...props} /> 
      <ErrorMessage name={props.name} component='div' className={styles.errorMessage} />
    </div>
  );
}

export default input;