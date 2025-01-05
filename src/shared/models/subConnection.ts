export class SubConnection{
  constructor(
    public routeId: number,
    public fromStationId: number,
    public toStationId: number,
    public departureTime: string,
    public arrivalTime: string,
    public delayInMinutes: number,
  ) {
  }
}
