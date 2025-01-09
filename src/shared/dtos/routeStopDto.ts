export class RouteStopDto {
  constructor(
    public routeId: number,
    public stationId: number,
    public stationOrder: number,
    public departureTime: Date,
  ) {
  }
}
