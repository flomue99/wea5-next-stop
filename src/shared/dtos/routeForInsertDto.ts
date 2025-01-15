import {RouteStopForInsertDto} from './routeStopForInsertDto';
import {RouteOperatingDaysForInsertDto} from './routeOperatingDaysForInsertDto';

export interface RouteForInsertDto {
  routeNumber: number;
  validFrom: Date;
  validTo: Date;
  routeOperatingDays: RouteOperatingDaysForInsertDto;
  routeStops: RouteStopForInsertDto[];
}
