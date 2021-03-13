import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadCentrales = (centrales) => {
  return {
    type: actionTypes.LOAD_CENTRALES,
    centrales: centrales
  }
}

export const setCurrentCentral = (clickedCentral) => {
  return {
    type: actionTypes.SET_CURRENT_CENTRAL,
    clickedCentral: clickedCentral
  }
}

export const getCentrales = (uid) => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json`)
    .then(response => {
      console.log(response.data);
      const centrales = Object.keys(response.data);
      dispatch(loadCentrales(centrales));
      dispatch(setCurrentCentral(centrales[0]));
    })
    .catch(error => {
      console.log(error.response.data);
    })
  }
}