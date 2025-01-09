import {LocationDto} from './locationDto';

export class StationForInsertDto{
  constructor(
    public name: string,
    public abbreviation: string,
    public location: LocationDto,
  ) {
  }
}
