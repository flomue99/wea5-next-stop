export class HolidayDto {
  constructor(
    public id?: number,
    public name?: string,
    public type?: string,
    public fromDate?: Date,
    public toDate?: Date,
  ) {
  }
}
