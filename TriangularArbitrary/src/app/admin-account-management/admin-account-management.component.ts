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

  constructor(ticketService: TicketStorageService) {
    this.ticketService = ticketService;
    this.tickets = this.ticketService.getAllTickets();

   }

  ngOnInit(): void {
  }

  resolveTicket(index: number): void {
    this.ticketService.deleteTicket(index)
    this.tickets = this.ticketService.getAllTickets();
  }

}
