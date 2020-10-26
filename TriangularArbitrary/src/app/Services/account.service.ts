import { Injectable } from '@angular/core';

import { UserAccountType } from './../Enums/Enums';
import { IUserModel } from './../Models/IUserModel';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loggedIn:boolean;
  account: IUserModel;
  private authService: SocialAuthService;

  constructor(authService?: SocialAuthService) {
      this.authService = authService;
      this.account = new IUserModel();
     }

  public setUserAccount(user: SocialUser):void{
      if(user){
        this.account.id = user.id;
        this.account.firstName = user.firstName;
        this.account.lastName = user.lastName;
        this.account.email = user.email;
        this.account.photo = user.photoUrl;
        this.account.accountType = this.getAccountType();
        this.account.isAuthenticated = true;
      }
  }

  public getUserAccount(): IUserModel{

    // this.account = new IUserModel("abc123",null, 'Louis', 'Winthorpe III',
    // 'https://lh3.googleusercontent.com/a-/AOh14GhvZZQurEkbtdvPrvV8Fce3qApk7TQqsHhCJIdQ=s96-c');
    // this.account.isAuthenticated = true;

    return this.account;
  }

  public signOut():void{
    this.authService.signOut();
    //remove any reference to the user
    this.account = new IUserModel();
  }


  //+------------------------------------+
  // TODO: build out or fake out some more?
  //+------------------------------------+
  private getAccountType():UserAccountType{
    return UserAccountType.Regular;
  }

}
