import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserModel } from '../Models/IUserModel';
import { FormControl, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { UserAccountType, Currency, UserAccountContext } from '../Enums/Enums';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  //Input properties for tracking changes against and binding based on parent component context
  @Input() isBusy: boolean = false;
  @Input() model = new IUserModel();

  @Output() accountCreationEvent = new EventEmitter<boolean>();

  // set a local variable to this enum so we can traverse it for setting user-account title
  userAccountContext = UserAccountContext;

  enumKeys = Object.keys;
  accountTypes = UserAccountType;
  currencies = Currency;

  constructor() {
    if(this.model === undefined || this.model == null) this.model = new IUserModel();
  }

  ngOnInit(): void {

  }

  onSubmit(form:NgForm):void{
    this.isBusy = true;

    //debug
    console.log('New user: '+'First Name: ' +this.model.firstName +'\tLast Name: ' +this.model.lastName +'\tEmail: ' +this.model.email);

    //import account service - populate the account for use within app

    if(this.model.accountContext === UserAccountContext.create) {
      //CASE: create new account in firebase
      //pass to firestore service
      firebase.firestore().collection('users').add({
        accountType: this.model.accountType,
        email: this.model.email,
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        preferredCurrency: this.model.preferredCurrency,
        //secret: this.model.secret
        secret: 'abcdef'
      }).then(()=>{
          this.accountCreationEvent.emit(false)
          this.model = new IUserModel();
          form.reset();
          this.isBusy = false;
      }).catch((e) => {
        this.isBusy = false;
        console.error('Error writing user to database', e);
      });
      }
    else if(this.model.accountContext === UserAccountContext.update) {
      // TODO: CASE: update existing account in firebase

    }
  }

  onCancel(form):void{
    console.log('cancel');
    this.accountCreationEvent.emit(false);
    form.reset();
  }


}
