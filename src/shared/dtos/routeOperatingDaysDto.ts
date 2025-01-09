export class RouteOperatingDaysDto {
  constructor(
    public routeId: number,
    public weekDays: boolean,
    public weekends: boolean,
    public publicHolidays: boolean,
    public schoolHolidays: boolean,
  ) {
  }
}
