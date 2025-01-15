import {RouteOperatingDaysDto} from './routeOperatingDaysDto';

export interface RouteDto {
  id: number;
  routeNumber: number;
  validForm: Date;
  validTo: Date;
  routeOperatingDays: RouteOperatingDaysDto;
}
