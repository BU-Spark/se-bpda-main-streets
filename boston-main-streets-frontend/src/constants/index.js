import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export const nameRule = /[^a-zA-Z]+/g
export const bostonCenter = [42.361, -71.057]

// firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

// emulators:auth
// if (window.location.hostname === "localhost") {
//     connectAuthEmulator(auth, "http://localhost:9099")
// }

// districts
export const districts = [
    'Allston-Village',
    'Bowdoin-Geneva',
    'Brighton',
    'Chinatown',
    'East-Boston',
    'Egleston-Square',
    'Fields-Corner',
    'Four-Corners',
    'Greater-Ashmont',
    'Greater-Grove-Hall',
    'Hyde-Park',
    'JP-Centre-South',
    'Mattapan-Square',
    'Mission-Hill',
    'Roslindale-Village',
    'Roxbury',
    'Three-Squares',
    'Uphams-Corner',
    'Washington-St-Gateway',
    'West-Roxbury'
]



// data types
export const dataTypes = [
    "spending", "mobility", "industries"
]