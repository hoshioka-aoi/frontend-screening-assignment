export type LogType = "departure" | "arrival";

export interface FlightLog {
  passengerName: string;
  airport: string;
  timestamp: number;
  type: LogType;
}

export interface RouteStats {
  total: number;
  count: number;
}