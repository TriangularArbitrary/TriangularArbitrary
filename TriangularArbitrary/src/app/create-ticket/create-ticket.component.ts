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

  ticketTypes = TicketTypes;
  severityTypes = TicketSeverityTypes;
  enumKeys = Object.keys;

  constructor() {
    this.model = new ITicketModel();
   }

  ngOnInit(): void {
  }

  // SubmitTicket to save the ITicketModel object to LocalStorage as a POC and then if we add Firebase, we'll set it there somehow
  SubmitTicket(form: NgForm): void {
    let currentTickets: ITicketModel[] = JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets));

    currentTickets != null ? currentTickets.push(this.model) : currentTickets = [this.model];
    this.Tickets = currentTickets;
    localStorage.setItem(LocalStorageKeys.Tickets, JSON.stringify(currentTickets));
  }

  // SubmitTicket to save the ITicketModle object to Firebase as a POC for firebase
  SubmitTicketFirebase(): void {
    console.log("Implement me!")
  }
}
