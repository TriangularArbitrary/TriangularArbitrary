import { Component, Input, OnInit } from '@angular/core';
import { IUserModel } from '../Models/IUserModel';
import { FormControl, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { UserAccountType, Currency } from '../Enums/Enums';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  @Input() isBusy = false;

  model = new IUserModel();
  enumKeys = Object.keys;
  accountTypes = UserAccountType;
  currencies = Currency;

  constructor() {
    this.model = new IUserModel();
  }

  ngOnInit(): void {

  }

  onSubmit(form:NgForm):void{
    this.isBusy = true;

    //debug
    console.log('New user: '+'First Name: ' +this.model.firstName +'\tLast Name: ' +this.model.lastName +'\tEmail: ' +this.model.email);

    //import account service - populate the account for use within app


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
        this.model = new IUserModel();
        form.reset();
        this.isBusy = false;
    }).catch((e) => {
      this.isBusy = false;
      console.error('Error writing user to database', e);
    });

  }

  onCancel(form):void{
    console.log('cancel');
    form.reset();
  }


}
