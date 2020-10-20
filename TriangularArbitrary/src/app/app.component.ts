import { LocalStorageKeys } from './Enums/Enums';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAGVrbwqSR3WZjlUpL_13y7lLDe8e1kYWA",
  authDomain: "triangulararbitrary.firebaseapp.com",
  databaseURL: "https://triangulararbitrary.firebaseio.com",
  projectId: "triangulararbitrary",
  storageBucket: "triangulararbitrary.appspot.com",
  messagingSenderId: "991332102738",
  appId: "1:991332102738:web:1399c62301d65b001fe58b",
  measurementId: "G-QRJ5RJR3F8"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TriangularArbitrary';
  localStorageKeys = Object.keys(LocalStorageKeys);

  constructor() {

    // On Construction of the App Component,
    // get the localStorage Key/Value pair for storage (Could move pieces out to other components,
    // could remove if we use firebase or something else for storage)
    // Simply add the key to the LocalStorageKeys enum and set key/value where you need to it. (localStorage.setItem(...))

    this.localStorageKeys.forEach(element => {
      localStorage.getItem(element);
    });


    // Firebase initialization - takes the firebaseConfig constant that points to the TriangularArbitrary firebase app
    // and initializes its development functions for use
    let app = firebase.initializeApp(firebaseConfig);
  }
}


