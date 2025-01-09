export class SubConnectionDto {
  constructor(
    public routeId: number,
    public routeNr: number,
    public fromStationId: number,
    public toStationId: number,
    public departureTime: string,
    public arrivalTime: string,
    public delayInMinutes: number,
  ) {
  }
}
