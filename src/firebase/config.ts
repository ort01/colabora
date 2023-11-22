
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCUlVK0G3hP8bAS8R6ouBwozKMNPFN5h54",
    authDomain: "colabora-69cf1.firebaseapp.com",
    projectId: "colabora-69cf1",
    storageBucket: "colabora-69cf1.appspot.com",
    messagingSenderId: "973182500351",
    appId: "1:973182500351:web:e26f5929ebdbda36cbfbca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// services
const db = getFirestore(app)
const auth = getAuth(app);

//timestamp
const timestamp = serverTimestamp()

export { db, auth, timestamp }