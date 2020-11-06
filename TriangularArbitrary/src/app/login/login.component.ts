import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { IUserModel } from './../Models/IUserModel';
import { AccountService } from './../Services/account.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Output properties for emitting events to parent (App.Component)
  @Output() accountCreationEvent = new EventEmitter<boolean>();
  @Output() userAuthenticated = new EventEmitter<boolean>();
  @Output() userAccountEvent = new EventEmitter<IUserModel>();

  user: SocialUser;
  loggedIn:boolean;
  formEmail: string;
  formPassword: string;

  constructor(private authService: SocialAuthService,
              private accountService: AccountService, private router: Router) {
               }


  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if(this.loggedIn){
        this.accountService.setUserAccount(user);
        console.log('populated model: ' + this.accountService.getUserAccount().isAuthenticated);
        this.router.navigate(['favorites']);
      }

      // console.log(
      //   'id: ' + user.id
      //   //+ '\ntoken: ' + user.authToken + '\nauthcode: ' + user.authorizationCode + '\nIdToken: ' + user.idToken
      //   + '\nemail: ' + user.email + '\nfirstname: ' + user.firstName + ' \nlastname: ' + user.lastName
      //   + '\nphoto: ' + user.photoUrl
      //   //+ '\n:' + user.provider
      //   + '\nresponse: ' + user.response
      // )
    })
  }

  createAccountClicked() {
    this.accountCreationEvent.emit(true);
    this.router.navigate(['user-account']);

  }

  signInWithEmail(): void{
    // TODO: authenticate by searching in firebase, finding a match on email and checking against the stored secret
    this.userAuthenticated.emit(true);
    this.router.navigate(['favorites'])
  }

  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}

