export interface RouteOperatingDaysDto {
  routeId: number;
  weekDays: boolean;
  weekends: boolean;
  publicHolidays: boolean;
  schoolHolidays: boolean;
}
