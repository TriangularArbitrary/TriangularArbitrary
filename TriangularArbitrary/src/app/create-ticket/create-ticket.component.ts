import { TicketTypes, TicketSeverityTypes, LocalStorageKeys } from './../Enums/Enums';
import { ITicketModel } from './../Models/ITicketModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  model: ITicketModel;
  ticketTypes = TicketTypes;
  severityTypes = TicketSeverityTypes;
  enumKeys = Object.keys;

  Tickets = JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets)) as ITicketModel[];

  constructor() {
    this.model = new ITicketModel();
   }

  ngOnInit(): void {
  }

  // SubmitTicket to save the ITicketModel object to LocalStorage as a POC and then if we add Firebase, we'll set it there somehow
  SubmitTicket(form: NgForm): void {
    console.log(this.model);
    let currentTickets: ITicketModel[] = JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets));

    if (currentTickets != null) {
      currentTickets.push(this.model);
    }
    else {
      currentTickets = [this.model];
    }
    localStorage.setItem(LocalStorageKeys.Tickets, JSON.stringify(currentTickets));
  }
}
