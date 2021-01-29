import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START
  }
}

export const loadInit = (uid, formData) => {
  return dispatch => {
    dispatch(loadStart());
    console.log(uid)

    axios.post(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json`, formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e.response.data);
    })
  }
}