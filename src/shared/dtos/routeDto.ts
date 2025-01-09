import {RouteOperatingDaysDto} from './routeOperatingDaysDto';

export class RouteDto {
  constructor(
    public id: number,
    public routeNumber: number,
    public validForm: Date,
    public validTo: Date,
    public routeOperatingDays: RouteOperatingDaysDto,
  ) {
  }
}
