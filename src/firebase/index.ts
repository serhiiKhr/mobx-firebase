import * as firebase from 'firebase';

// todo: move to .env
const firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;

export const database = firebase.database();
export const storage: firebase.storage.Storage = firebase.storage();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
