export interface Passenger {
  firstName: string;
  lastName: string;
  paxType: string;
  seat?: string;
}

export interface PassengerCardProps {
  passenger: Passenger;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

export interface PassengerSelectProps {
  passengers: Passenger[];
  onNext: (selected: Passenger[]) => void;
  onBack: () => void;
}
