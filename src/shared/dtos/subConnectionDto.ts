export interface SubConnectionDto {
  routeId: number;
  routeNr: number;
  fromStationId: number;
  toStationId: number;
  departureTime: string;
  arrivalTime: string;
  delayInMinutes: number;
}
