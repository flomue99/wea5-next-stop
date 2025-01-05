import {Location} from '../models/location';

export class StationForInsertDto{
  constructor(
    public name: string,
    public abbreviation: string,
    public location: Location,
  ) {
  }
}
