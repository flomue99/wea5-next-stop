import {Location} from './location';

export class StationWithDistance {
  constructor(
    public id?: number,
    public name?: string,
    public abbreviation?: string,
    public location?: Location,
    public distance?: number,
  ) {
  }
}
