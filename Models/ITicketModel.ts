import { TicketTypes, TicketSeverityTypes } from '../Enums/Enums';

export class ITicketModel {
  subject: string;
  type: TicketTypes;
  severity: TicketSeverityTypes;
  ticketReason: string;
}
