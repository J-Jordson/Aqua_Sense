import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCia8mptwVMPvjG2J5Vbng5eZ9zlw3ES-8",
    authDomain: "aqua-sense-7b597.firebaseapp.com",
    projectId: "aqua-sense-7b597",
    storageBucket: "aqua-sense-7b597.appspot.com",
    messagingSenderId: "254897782749",
    appId: "1:254897782749:web:ea71aeb01ae4fd26f30034"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);          // Inicializa o Firebase Authentication
const database = getDatabase(app);  // Inicializa o Realtime Database

export { auth, database };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
