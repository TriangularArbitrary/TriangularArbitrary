import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() accountCreationEnabled = new EventEmitter<boolean>();

  user: SocialUser;
  loggedIn:boolean;
  account: IUserModel;

  constructor(private authService: SocialAuthService,
              private accountService: AccountService) {
               }


  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if(this.loggedIn){
        this.accountService.setUserAccount(user);
        console.log('populated model: ' + this.accountService.getUserAccount().isAuthenticated);
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
    console.log('Login Component create account clicked' + this.accountCreationEnabled);
    this.accountCreationEnabled.emit(true);
  }

  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut():void{
    this.authService.signOut();
    //remove any reference to the user
    this.account = null;
  }

}

