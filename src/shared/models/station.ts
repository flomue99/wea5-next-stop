import {Location} from './location';

export class Station{
  constructor(
    public id?: number,
    public name?: string,
    public abbreviation?: string,
    public location?: Location,
  ) {
  }
}
