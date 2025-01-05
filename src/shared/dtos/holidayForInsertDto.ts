export class HolidayForInsertDto{
  constructor(
    public name: string,
    public type: string,
    public fromDate: Date,
    public toDate: Date,
  ) {
  }
}
