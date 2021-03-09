import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadCentrales = (centrales) => {
  return {
    type: actionTypes.LOAD_CENTRALES,
    centrales: centrales
  }
}

export const getCentrales = (uid) => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json`)
    .then(response => {
      console.log(response.data);
      dispatch(loadCentrales(Object.keys(response.data)));
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }
}