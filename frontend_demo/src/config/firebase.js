import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAuK4JvG9AlUn6-yC_cVEmHKeYFBNWSeTE",
  authDomain: "digital-pen-746a6.firebaseapp.com",
  projectId: "digital-pen-746a6",
  storageBucket: "digital-pen-746a6.appspot.com",
  messagingSenderId: "742216851898",
  appId: "1:742216851898:web:950fd63a22e50da22bfd83",
  measurementId: "G-7N4CDEWP1W",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
