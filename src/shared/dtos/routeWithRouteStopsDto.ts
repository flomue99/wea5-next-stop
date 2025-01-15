import {RouteOperatingDaysDto} from './routeOperatingDaysDto';
import {RouteStopDto} from './routeStopDto';

export interface RouteWithRouteStopsDto {
  id: number;
  routeNumber: number;
  validFrom: Date;
  validTo: Date;
  routeOperatingDays: RouteOperatingDaysDto;
  routeStops: RouteStopDto[];
}
