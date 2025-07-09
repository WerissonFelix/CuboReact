import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCAmQ5YiGUE3qaWr7tD38aXyXxgLROJ_sY",
    authDomain: "cubo.firebaseapp.com",
    projectId: "cubo-42758",
    storageBucket: "cubo.appspot.com",
    messagingSenderId: "417447425142",
    appId: "1:417447425142:web:7e8340277f46ca8083db57"
};
const app = initializeApp(config);

const db = getFirestore(app);


export {db};