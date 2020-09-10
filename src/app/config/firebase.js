import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAb99g5tAmCKaRjwQ_4fkEP4D4tlfxnLXI",
    authDomain: "revents-dbb-2020.firebaseapp.com",
    databaseURL: "https://revents-dbb-2020.firebaseio.com",
    projectId: "revents-dbb-2020",
    storageBucket: "revents-dbb-2020.appspot.com",
    messagingSenderId: "651558773337",
    appId: "1:651558773337:web:4ebbeba97b66c9bfde4748"

}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;