import { Identifiers } from '@angular/compiler';
import { UserAccountType } from '../Enums/Enums';

export class IUserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
    isAuthenticated: boolean;
    accountType: UserAccountType;

    constructor(id?: string, email?: string, firstName?: string, lastName?: string, photo?: string, accountType?: UserAccountType){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.isAuthenticated = false;
        this.accountType = accountType;
    }

    //yep, intense level of security
    setAuthentication(status: boolean){
        this.isAuthenticated = status;
    }
}