import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START
  }
}

export const loadInit = (token,uid, formData) => {
  return dispatch => {
    dispatch(loadStart());
    console.log(uid)

    axios.put(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json?auth=${token}&uid=${uid}`, formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e.response.data);
    })
  }
}