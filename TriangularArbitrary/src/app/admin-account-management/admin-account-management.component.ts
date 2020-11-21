import { AccountService } from './../Services/account.service';
import { IUserModel } from './../Models/IUserModel';
import { ITicketModel } from './../Models/ITicketModel';
import { TicketStorageService } from './../Services/ticket-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin-account-management',
  templateUrl: './admin-account-management.component.html',
  styleUrls: ['./admin-account-management.component.css']
})
export class AdminAccountManagementComponent implements OnInit {

  private ticketService: TicketStorageService;

  @Input() tickets: ITicketModel[];
  @Input() users: IUserModel[] = [];
  @Input() ticketTableisBusy: boolean;
  @Input() accountTableIsBusy: boolean = null;

  constructor(ticketService: TicketStorageService, private accountService: AccountService) {
    this.ticketService = ticketService;

    // LocalStorage solution:
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    this.tickets = this.ticketService.getAllFirebaseTickets();
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    var loadedUsers = [];
    await firebase.firestore().collection('users')
    .get()
      .then(function(querySnapshot){
          if (querySnapshot != null) {
            querySnapshot.docs.map(function(doc){
              loadedUsers.push(new IUserModel(
                doc.id,
                doc.data().email,
                doc.data().firstName,
                doc.data().lastName,
                null,
                doc.data().accountType,
                doc.data().preferredCurrency,
                null,
                null
              ));

            });
          } else {
            console.error('Failed to load users')
          }
        }).catch(function(error){
          console.log('error: ' + error);
        });

        this.users = loadedUsers
        console.log(this.users)
  }

  removeUser(index: string): void {
    this.accountTableIsBusy = true;
    var user = this.users[index];
    this.accountService.deleteUserAccount(user.id).then( () => {
      this.users.splice(parseInt(index), 1)
      this.accountTableIsBusy = false
    }).catch(e => {
      console.log(e)
      this.accountTableIsBusy = false
    })
  }

  resolveTicket(index: string): void {

    this.ticketTableisBusy = true;
    // LocalStorage solution:
    // this.ticketService.deleteTicket(index)
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    this.ticketService.deleteFirebaseTicket(this.tickets[index].id).then( () =>
      {
        this.tickets = this.ticketService.getAllFirebaseTickets();
        this.ticketTableisBusy = false;
      }
    );
  }

}
