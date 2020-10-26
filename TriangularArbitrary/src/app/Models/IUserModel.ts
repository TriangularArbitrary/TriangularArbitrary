import { Identifiers } from '@angular/compiler';
import { Currency, UserAccountType } from '../Enums/Enums';

export class IUserModel {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
    isAuthenticated: boolean;
    accountType: UserAccountType;
    preferredCurrency: Currency;
    secret: string;

    constructor(id?: string, email?: string, firstName?: string, lastName?: string, photo?: string,
                accountType?: UserAccountType, preferredCurrency?: Currency, secret?: string){
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photo = photo;
        this.isAuthenticated = false;
        this.accountType = accountType;
        this.preferredCurrency = preferredCurrency;
        this.secret = secret;
    }

    //yep, intense level of security
    setAuthentication(status: boolean){
        this.isAuthenticated = status;
    }
}
