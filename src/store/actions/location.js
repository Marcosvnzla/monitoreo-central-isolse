import * as actionTypes from './actionTypes';
import axios from 'axios';

const setLocations = (addresses) => {
  return {
    type: actionTypes.SET_LOCATIONS,
    addresses: addresses
  }
}

export const getLocations = (uid, token) => {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_FIREBASE_URL}/${uid}.json?auth=${token}&uid=${uid}`)
    .then(response => {
      const locationAddresses = [];
      const centrales = response.data;
      for (const central in centrales) {
        locationAddresses.push(centrales[central].Location);
      }
      dispatch(setLocations(locationAddresses));
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }
}