import * as firebase from 'firebase';

// todo: move to .env
const firebaseConfig = {
    apiKey: 'AIzaSyDbAEB3eDEvY_PbwdII0UPtZQhbo4zkL_A',
    authDomain: 'fir-react-43c53.firebaseapp.com',
    databaseURL: 'https://fir-react-43c53.firebaseio.com',
    projectId: 'fir-react-43c53',
    storageBucket: 'gs://fir-react-43c53.appspot.com/',
    messagingSenderId: '280069958396',
    appId: '1:280069958396:web:1dffdb53431eb443b10579',
    measurementId: 'G-M892SJY8EK'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;

export const database = firebase.database();
export const storage: firebase.storage.Storage = firebase.storage();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
