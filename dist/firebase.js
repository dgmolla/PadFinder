"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onValue = exports.ref = exports.db = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return database_1.ref; } });
Object.defineProperty(exports, "onValue", { enumerable: true, get: function () { return database_1.onValue; } });
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQxT7GLA2oHy7l8qQONgGLg4suPzuw4u4",
    authDomain: "padfinder-706dc.firebaseapp.com",
    databaseURL: "https://padfinder-706dc-default-rtdb.firebaseio.com",
    projectId: "padfinder-706dc",
    storageBucket: "padfinder-706dc.appspot.com",
    messagingSenderId: "910248660224",
    appId: "1:910248660224:web:860035b2cd77d7392a77e5"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, database_1.getDatabase)(app);
exports.db = db;
//# sourceMappingURL=firebase.js.map