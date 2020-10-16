import { TicketStorageService } from './../Services/ticket-storage.service';
import { TicketTypes, TicketSeverityTypes, LocalStorageKeys } from './../Enums/Enums';
import { ITicketModel } from './../Models/ITicketModel';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  @Input() model: ITicketModel;
  @Input() Tickets = JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets)) as ITicketModel[];

  private ticketService: TicketStorageService;

  ticketTypes = TicketTypes;
  severityTypes = TicketSeverityTypes;
  enumKeys = Object.keys;

  constructor(ticketService: TicketStorageService) {
    this.model = new ITicketModel();
    this.ticketService = ticketService;
   }

  ngOnInit(): void {
  }

  // SubmitTicket to save the ITicketModel object to LocalStorage as a POC and then if we add Firebase, we'll set it there somehow
  SubmitTicket(form: NgForm): void {
    this.ticketService.saveTicket(this.model);
    this.Tickets = this.ticketService.getAllTickets();
  }

  // SubmitTicket to save the ITicketModle object to Firebase as a POC for firebase
  SubmitTicketFirebase(): void {
    console.log("Implement me!")
  }
}
