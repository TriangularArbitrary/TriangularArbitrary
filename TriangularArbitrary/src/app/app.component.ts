import { LocalStorageKeys, UserAccountContext } from './Enums/Enums';
import { Component, Input } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';


import { AccountService } from './Services/account.service';
import { IUserModel } from './Models/IUserModel';
import { Router } from '@angular/router';

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

  //Input properties to track changes against
  @Input() accountCreationClicked = false;
  @Input() account: IUserModel;

  title = 'TriangularArbitrary';
  localStorageKeys = Object.keys(LocalStorageKeys);
  showImage: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {

    // get account object for use authenticating and contextualizing the app
    this.getAppSessionAccount();

    // On Construction of the App Component,
    // get the localStorage Key/Value pair for storage (Could move pieces out to other components,
    // could remove if we use firebase or something else for storage)
    // Simply add the key to the LocalStorageKeys enum and set key/value where you need to it. (localStorage.setItem(...))
    // this.localStorageKeys.forEach(element => {
    //   localStorage.getItem(element);
    // });


    // Firebase initialization - takes the firebaseConfig constant that points to the TriangularArbitrary firebase app
    // and initializes its development functions for use
    let app = firebase.initializeApp(firebaseConfig);


    //DEBUG without login
    // this.account.isAuthenticated = true;
  }

  signOut():void{
    this.accountService.signOut();
    this.account = this.accountService.getUserAccount();
    this.account.isAuthenticated = false;
    this.accountCreationClicked = false;
    this.router.navigate(['login']);
  }

  getAppSessionAccount():void {

    //Load up the user account for app use
    this.account = this.accountService.getUserAccount();
  }

  accountUpdateClicked(): void {
    this.account.accountContext = UserAccountContext.update;
    this.accountCreationClicked = true;
  }

  accountCreationEvent(e: boolean) {
    this.account.accountContext = UserAccountContext.create;
    this.accountCreationClicked = e;
  }


  userAuthEvent(e: boolean) {
    this.account.isAuthenticated = e;
  }

}


