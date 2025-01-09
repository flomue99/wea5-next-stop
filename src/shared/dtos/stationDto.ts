import {LocationDto} from './locationDto';

export class StationDto {
  constructor(
    public id?: number,
    public name?: string,
    public abbreviation?: string,
    public location?: LocationDto,
  ) {
  }
}
