import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyD3bxkEtb4D9Qmd8-CZuUgCM28nnV3_LVA",
    authDomain: "sistema-cb165.firebaseapp.com",
    projectId: "sistema-cb165",
    storageBucket: "sistema-cb165.appspot.com",
    messagingSenderId: "858198999641",
    appId: "1:858198999641:web:cb770c73e727b3449c2748",
    measurementId: "G-3DV3QJ6PXC"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }
  export default firebase;
 