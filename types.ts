
export type LaneId = 1 | 2 | 3 | 'full';

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  laneId: LaneId;
  startTime: string; // HH:mm
  date: string; // YYYY-MM-DD
  duration: 30 | 60;
  type: 'rental' | 'maintenance' | 'pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  visitsThisMonth: number;
  isAdmin?: boolean;
}

export enum BookingView {
  INDIVIDUAL = 'individual',
  FULL_FACILITY = 'full_facility'
}
