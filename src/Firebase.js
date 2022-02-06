import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuOcYQyk_rn9_9NuW9g1m3ztKAPw8NFJs",
  authDomain: "loge-a653f.firebaseapp.com",
  projectId: "loge-a653f",
  storageBucket: "loge-a653f.appspot.com",
  messagingSenderId: "738875821962",
  appId: "1:738875821962:web:bcfa9ec2f9357ea2c0c273",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
