import { Injectable } from '@angular/core';
import { TicketTypes, TicketSeverityTypes, LocalStorageKeys } from './../Enums/Enums';
import { ITicketModel } from './../Models/ITicketModel';


@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {

  constructor() {}

  getAllTickets(): ITicketModel[] {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets));
  }

  saveTicket(newTicket: ITicketModel): void {
    let currentTickets: ITicketModel[] = this.getAllTickets();
    currentTickets != null ? currentTickets.push(newTicket) : currentTickets = [newTicket];
    this.saveAllTickets(currentTickets);
  }

  private saveAllTickets(currentTickets: ITicketModel[]): void {
    localStorage.setItem(LocalStorageKeys.Tickets, JSON.stringify(currentTickets));
  }

  deleteTicket(index: number): void {
    const currentTickets: ITicketModel[] = this.getAllTickets();
    currentTickets.splice(index, 1);
    this.saveAllTickets(currentTickets);
  }
}
