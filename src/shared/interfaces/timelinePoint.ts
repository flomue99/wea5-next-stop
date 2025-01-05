export interface TimelinePoint {
  type: string;
  routeId: number,
  time: string;
  stationId: number;
  delayInMinutes: number;
}
