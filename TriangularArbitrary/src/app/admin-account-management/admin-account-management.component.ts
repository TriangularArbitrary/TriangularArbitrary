import { AccountService } from './../Services/account.service';
import { IUserModel } from './../Models/IUserModel';
import { ITicketModel } from './../Models/ITicketModel';
import { TicketStorageService } from './../Services/ticket-storage.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() resolveReason: string;


  constructor(ticketService: TicketStorageService, private accountService: AccountService, private modalService: NgbModal) {
    this.ticketService = ticketService;

    // LocalStorage solution:
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    this.tickets = this.ticketService.getAllFirebaseTickets(true);
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

  resolveTicket(index: string, resolveReason: string): void {

    this.ticketTableisBusy = true;
    // LocalStorage solution:
    // this.ticketService.deleteTicket(index)
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    const resolvedTicket: ITicketModel = this.tickets[index];
    resolvedTicket.resolved = true;
    resolvedTicket.resolvedReason = resolveReason
    this.ticketService.updateFirebaseTicket(resolvedTicket).then( () =>
      {
        this.tickets = this.ticketService.getAllFirebaseTickets(true);
        this.ticketTableisBusy = false;
      }
    );
  }


  openResolveModal(content, index: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === ModalDismissReasons.ESC) {
        // by pressing ESC
      } else if (result === ModalDismissReasons.BACKDROP_CLICK) {
        // by clicking on a backdrop
      } else {
        // resolve ticket
        this.resolveTicket(index, this.resolveReason)
      }
    }, (reason) => {
      // modal dismissed
    });
  }


}
