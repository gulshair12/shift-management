export interface ShiftDetails {
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  checkCalls: boolean;
  chargeRate: number;
  payRate: number;
  notes?: string;
  internalNote?: string;
  site: { name: string; postcode: string };
  client: { name: string; email: string };
  count?: number;
}

export interface Shift extends ShiftDetails {
  id: string;
}
