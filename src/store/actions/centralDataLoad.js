import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START
  }
}

export const loadInit = (token,uid, formData, currentCentral) => {
  return dispatch => {
    dispatch(loadStart());

    axios.put(`${process.env.REACT_APP_FIREBASE_URL}/${uid}/${currentCentral}/Central_Info.json?auth=${token}&uid=${uid}`, formData)
    .then(response => {
    })
    .catch(e => {
      console.log(e.response.data);
    })
  }
}