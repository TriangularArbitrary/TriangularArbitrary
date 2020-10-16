import { TicketTypes, TicketSeverityTypes } from '../Enums/Enums';

export class ITicketModel {
  subject: string;
  type: TicketTypes;
  severity: TicketSeverityTypes;
  ticketReason: string;
  user: string;

  constructor(subject?: string, type?: TicketTypes, severity?: TicketSeverityTypes, ticketReason?: string, user?: string) {
    this.subject = subject;
    this.type = type;
    this.severity = severity;
    this.ticketReason = ticketReason;
    this.user = user;
  }
}
