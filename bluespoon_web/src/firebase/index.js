import firebase from "firebase/app";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAesvG7vvXDiJiaoyT9GTpfaNwmm6rP8cw",
    authDomain: "bluespoon-307b9.firebaseapp.com",
    projectId: "bluespoon-307b9",
    storageBucket: "bluespoon-307b9.appspot.com",
    messagingSenderId: "680882548442",
    appId: "1:680882548442:web:2631b421a3e32f10a17fe3",
    measurementId: "G-1QQLZLYD44"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };