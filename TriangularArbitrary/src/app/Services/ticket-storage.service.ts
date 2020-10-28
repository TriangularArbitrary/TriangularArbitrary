import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { TicketTypes, TicketSeverityTypes, LocalStorageKeys } from './../Enums/Enums';
import { ITicketModel } from './../Models/ITicketModel';


@Injectable({
  providedIn: 'root'
})
export class TicketStorageService {

  constructor() {}

  // #region "LocalStorage Functionality"
  ///////////////////////////////////////
  /**
   * Get All Tickets from LocalStorage
   */
  getAllTickets(): ITicketModel[] {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.Tickets));
  }

  /**
   * Save Ticket to LocalStorage
   * @param newTicket
   */
  saveTicket(newTicket: ITicketModel): void {
    let currentTickets: ITicketModel[] = this.getAllTickets();
    currentTickets != null ? currentTickets.push(newTicket) : currentTickets = [newTicket];
    this.saveAllTickets(currentTickets);
  }

  /**
   * Saves all current tickets to LocalStorage
   * @param currentTickets
   */
  private saveAllTickets(currentTickets: ITicketModel[]): void {
    localStorage.setItem(LocalStorageKeys.Tickets, JSON.stringify(currentTickets));
  }

  /**
   * Delete specified ticket index from LocalStorage
   * @param index
   */
  deleteTicket(index: number): void {
    const currentTickets: ITicketModel[] = this.getAllTickets();
    currentTickets.splice(index, 1);
    this.saveAllTickets(currentTickets);
  }
  //////////////////////////////////////////
  // #endregion "LocalStorage Functionality"




  // #region "Firebase Functionality"
  ///////////////////////////////////

  getAllFirebaseTickets(): ITicketModel[] {
    // return firebase.firestore().collection('tickets').get()

    return {} as ITicketModel[];
  }

  /**
   * Save ticket to Firebase DB
   * @param newTicket
   */
  saveFirebaseTicket(newTicket: ITicketModel): Promise<any> {
    return firebase.firestore().collection('tickets').add( {
      subject: newTicket.subject,
      type: newTicket.type,
      severity: newTicket.severity,
      ticketReason: newTicket.ticketReason
    })
      .catch((e) => {
      console.error('Error writing new ticket to database', e);
    });
  }
  //////////////////////////////////////
  // #endregion "Firebase Functionality"
}
