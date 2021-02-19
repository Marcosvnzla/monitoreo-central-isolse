import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyA7wXtS7zdsoGu7d5YBviLhCLpmWhPisU4",
  authDomain: "sistema-de-monitoreo-72a42.firebaseapp.com",
  databaseURL: "https://sistema-de-monitoreo-72a42-default-rtdb.firebaseio.com",
  projectId: "sistema-de-monitoreo-72a42",
  storageBucket: "sistema-de-monitoreo-72a42.appspot.com",
  messagingSenderId: "809156119901",
  appId: "1:809156119901:web:f0b4b3a4d84480c8c7ecb4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;