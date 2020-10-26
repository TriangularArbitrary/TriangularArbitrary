import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { IUserModel } from './../Models/IUserModel';
import { AccountService } from './../Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private accountService: AccountService;
  private authService: SocialAuthService;
  user: SocialUser;
  loggedIn:boolean;
  account: IUserModel;

  constructor(authService: SocialAuthService,
              accountService: AccountService) {
                this.authService = authService;
                this.accountService = accountService;
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

  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut():void{
    this.authService.signOut();
    //remove any reference to the user
    this.account = null;
  }

}

