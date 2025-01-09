import {RouteOperatingDaysDto} from './routeOperatingDaysDto';
import {RouteStopDto} from './routeStopDto';

export class RouteWithRouteStopsDto {
  constructor(
    public id: number,
    public routeNumber: number,
    public validForm: Date,
    public validTo: Date,
    public routeOperatingDays: RouteOperatingDaysDto,
    public routeStops: RouteStopDto[],
  ) {
  }
}
