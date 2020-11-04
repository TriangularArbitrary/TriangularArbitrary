import { ITicketModel } from './../Models/ITicketModel';
import { TicketStorageService } from './../Services/ticket-storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-account-management',
  templateUrl: './admin-account-management.component.html',
  styleUrls: ['./admin-account-management.component.css']
})
export class AdminAccountManagementComponent implements OnInit {

  private ticketService: TicketStorageService;

  @Input() tickets: ITicketModel[];
  @Input() isBusy: boolean;

  constructor(ticketService: TicketStorageService) {
    this.ticketService = ticketService;

    // LocalStorage solution:
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    this.tickets = this.ticketService.getAllFirebaseTickets();
   }

  ngOnInit(): void {
  }

  resolveTicket(index: string): void {

    this.isBusy = true;
    // LocalStorage solution:
    // this.ticketService.deleteTicket(index)
    // this.tickets = this.ticketService.getAllTickets();

    // Firebase solution:
    this.ticketService.deleteFirebaseTicket(this.tickets[index].id).then( () =>
      {
        this.tickets = this.ticketService.getAllFirebaseTickets();
        this.isBusy = false;
      }
    );
  }

}
