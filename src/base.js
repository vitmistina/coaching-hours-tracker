import Rebase from "re-base";
import firebase from "firebase";
import * as config from "./baseConfig";

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
