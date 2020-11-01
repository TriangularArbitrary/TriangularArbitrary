export enum TicketSeverityTypes {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical'
}

export enum TicketTypes {
  AccountIssue = 'Account Issue',
  Bug = 'Bug'
}

export enum LocalStorageKeys {
  Tickets = 'Tickets',
  Accounts = 'Accounts',
  Favorites = 'Favorites'
}

export enum UserAccountType{
  Regular = 'Regular',
  PowerUser = 'Power User',
  Lucky = 'Lucky',
  Administrator = 'Administrator',
  FraudDetector = 'Fraud Detector'
}

export enum Currency{
  USD = 'USD',
  CAD = 'CAD',
  BitCoin = 'BitCoin'
}

export enum UserAccountContext {
  create = 'Create Account',
  update = 'Update Account'
}
