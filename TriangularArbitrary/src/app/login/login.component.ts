import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { FormControl, NgForm } from '@angular/forms'

import { IUserModel } from './../Models/IUserModel';
import { AccountService } from './../Services/account.service';
import { UserAccountContext } from '../Enums/Enums';
import { ToastrService } from '../../../node_modules/ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  //Output properties for emitting events to parent (App.Component)
  @Output() accountCreationEvent = new EventEmitter<boolean>();
  @Output() userAuthenticated = new EventEmitter<boolean>();
  @Output() userAccountEvent = new EventEmitter<IUserModel>();

  model: IUserModel;

  constructor(private authService: SocialAuthService,
              private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
                this.model = new IUserModel();
               }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {

      if(user != null){
        //1. set the app account of the user
        this.accountService.setUserAccount(user, true);

        //  +---------------------------------------------------------------+
        //  | if this is the first time the user has logged in then we need |
        //  | to add their info to our data store except for secret         |
        //  +---------------------------------------------------------------+

        //2. send to an async method since we can't await here
        this.insertSocialUser();

        this.router.navigate(['favorites']);
      }
    })
  }

  ngOnDestroy(): void {
    this.model = null;
    this.accountCreationEvent = null;
    this.userAuthenticated = null;
    this.userAccountEvent = null;
    this.authService = null;
    this.accountService = null;
    this.router = null;
  }

  async insertSocialUser():Promise<void>{

    var socialUser;

    this.authService.authState.subscribe((user) => {
      socialUser = user;
    })

    console.log('Social User: ', socialUser);

    if(socialUser != null){

      //b/c of the async nature, get a reference to the account service
      if(this.accountService != null){
        var refAccountServ = this.accountService;
      }
      console.log('this.accountService', this.accountService === null);

      //check if social user already exists
      var appUser =  await refAccountServ.getUserAccountByEmail(socialUser.email);

      console.log('App User:  ', appUser);
      console.log('this.accountService', this.accountService === null);
      console.log('refAccountServ', refAccountServ === null);

      if (appUser === null){
        //await this.accountService.insertUserAccount(this.accountService.getUserAccount());
        await refAccountServ.insertUserAccount(refAccountServ.getUserAccount());
      }else{

        //if we already have the user need to set the app specific data that we don't get with social login
        if(refAccountServ != null){
          refAccountServ.setUserAccount(appUser, true);
        }

        //TODO: Compare existing values in datastore with recent social pull
        // updated if any changes
      }
    }

  };

  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  createAccountClicked() {
    this.accountCreationEvent.emit(true);
    this.router.navigate(['user-account']);

  }

  async signInWithEmail(): Promise<void>{

    if(this.model.email != undefined){
      try{
          var signInUser = await this.accountService.getUserAccountByEmail(this.model.email, true);

      }catch(error){
        console.log('unable to sign in with requested email: ' + error);
      }

      //TODO: temp for debugging - reset below
      // signInUser.accountContext = UserAccountContext.update;
      //   this.accountService.setUserAccount(signInUser);
      //   this.userAuthenticated.emit(true);
      //   this.router.navigate(['favorites']);

      if(signInUser.email === this.model.email && signInUser.secret === this.model.secret){

        //load user into userAccount
        signInUser.accountContext = UserAccountContext.update;
        this.accountService.setUserAccount(signInUser);
        this.userAuthenticated.emit(true);
        this.router.navigate(['favorites']);
      }else{
        this.toastr.error("You have failed me for the last time.");
      }
    }
  }
}

