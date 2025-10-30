export enum PaxType {
  ADT = 'ADT',
  CHD = 'CHD',
  INF = 'INF',
}

export type Passenger = {
  firstName: string
  lastName: string
  paxType: PaxType
  seat?: string | null
  checkedIn: boolean
}
