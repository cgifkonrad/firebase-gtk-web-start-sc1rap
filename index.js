// Import stylesheets
import "./style.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from "firebaseui";

// Document elements
const startRsvpButton = document.getElementById("startRsvp");
const guestbookContainer = document.getElementById("guestbook-container");

const form = document.getElementById("leave-message");
const input = document.getElementById("message");
const guestbook = document.getElementById("guestbook");
const numberAttending = document.getElementById("number-attending");
const rsvpYes = document.getElementById("rsvp-yes");
const rsvpNo = document.getElementById("rsvp-no");

var rsvpListener = null;
var guestbookListener = null;

async function main() {
  // Add Firebase project configuration object here
  var firebaseConfig = {
    apiKey: 'AIzaSyBKIZURorKqZakYepN7o-v2m-huWlS6HSU',
    authDomain: 'fir-web-codelab-f46f0.firebaseapp.com',
    projectId: 'fir-web-codelab-f46f0',
    storageBucket: 'fir-web-codelab-f46f0.appspot.com',
    messagingSenderId: '366086994616',
    appId: '1:366086994616:web:ac9edb0b10c2a2902b924d',
    measurementId: 'G-MXMPPFX3RR'
  };

  // Make sure Firebase is initilized
  try {
    if (firebaseConfig && firebaseConfig.apiKey) {
      firebase.initializeApp(firebaseConfig);
    }
    let app = firebase.app();
  } catch (e) {
    document.getElementById("app").innerHTML =
      "<h1>Firebase Config fehlt</h1>";
    console.log(e);
    throw new Error(
      "Error! App konnte nicht geoeffnet werden"
    );
  }

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Listen to RSVP button clicks
  startRsvpButton.addEventListener("click", () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  });

  // Listen to the current Auth state
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      startRsvpButton.textContent = "LOGOUT";
    } else {
      startRsvpButton.textContent = "RSVP";
    }
  });
}
main();
