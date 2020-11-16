import { Injectable } from '@angular/core';

import { Currency, UserAccountType } from './../Enums/Enums';
import { IUserModel } from './../Models/IUserModel';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root',
})
export class AccountService {
  loggedIn: boolean;
  account: IUserModel;
  private authService: SocialAuthService;

  constructor(authService?: SocialAuthService) {
    this.authService = authService;
    this.account = new IUserModel();
  }

  // +--------------------------------------+
  // |    Firebase methods begin            |
  // +--------------------------------------+

     public async getUserAccountByEmail(email: string, includeSecret: boolean = false): Promise<IUserModel>{

      var result = null;

      await firebase.firestore().collection('users')
      .where('email', '==', email)
      .get()
      .then(function(querySnapshot){

          if(querySnapshot.docs.length === 1 && querySnapshot != null){
            querySnapshot.docs.map(function(doc){
              //console.log('doc: ' + doc.id, ' => ', doc.data());

              //map into an IUserModel
              result = new IUserModel(
                doc.id,
                doc.data().email,
                doc.data().firstName,
                doc.data().lastName,
                null,
                doc.data().accountType,
                doc.data().preferredCurrency,
                includeSecret ? doc.data().secret : null,
                null
              );
              return result;
            });

          }else if(querySnapshot.docs.length > 1){
            console.error('More than 1 matching document');
          }else if (querySnapshot.empty){
            console.log('No matching documents in store');
          };
        }).catch(function(error){
          console.log('error: ' + error);
        });

      return result;
     }

     public async insertUserAccount(user: IUserModel): Promise<any>{

       //check that email is unique -- TODO: move to directive?
       var userCheck = await this.getUserAccountByEmail(user.email, false);
       if(userCheck != null && userCheck.email === user.email){
          throw new Error("No no no");
       }

        return firebase.firestore().collection('users').add({
          accountType: (user.accountType) ? user.accountType: UserAccountType.Undeclared,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredCurrency: (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared,
          secret: user.secret,    //shhh, don't tell anyone, it's not encrypted with a one-way hash
          createDate:  firebase.firestore.FieldValue.serverTimestamp(),
          modifiedDate:  firebase.firestore.FieldValue.serverTimestamp()
        }).catch((e) => {
          console.error('Error writing new ticket to database', e);
        });

      }


     public async updateUserAccount(user: IUserModel): Promise<any>{

      var userCheck = await this.getUserAccountByEmail(user.email, false);
      if(userCheck == null){
        throw new Error("Account can't be updated. Call the police.")
      }else{

        return firebase.firestore().collection('users').doc(userCheck.id).update({
          accountType: (user.accountType) ? user.accountType: UserAccountType.Undeclared,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          preferredCurrency: (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared,
          secret: user.secret,    //here either
          modifiedDate: firebase.firestore.FieldValue.serverTimestamp()

        }).catch((e) => {
          console.error('Error writing new ticket to database', e);
        });
      }

     }

     deleteUserAccount(id: string): Promise<any> {
      try{
        return firebase.firestore().collection('users').doc(id).delete();
      }
      catch(e) {
        console.error('unable to delete user', e);
      }
     }



  // +--------------------------------------+
  // |    Account methods begin             |
  // +--------------------------------------+

  //changed from type SocialUser to any user to accomodate email logins; could be problem if adding new providers that don't conform to standard interface
  public setUserAccount(user: any): void {
    if (user) {
      this.account.id = user.id;
      this.account.firstName = user.firstName;
      this.account.lastName = user.lastName;
      this.account.email = user.email;
      this.account.photo = user.photoUrl;
      //this.account.accountType = this.getAccountType();
      this.account.accountType = (user.accountType) ? user.accountType: UserAccountType.Undeclared;
      this.account.isAuthenticated = true;
      this.account.preferredCurrency = (user.preferredCurrency) ? user.preferredCurrency : Currency.Undeclared;
    }
  }

  public getUserAccount(): IUserModel {
    return this.account;
  }

  public signOut(): void {
    this.authService.signOut();
    //remove any reference to the user
    this.account = new IUserModel();
  }

}
