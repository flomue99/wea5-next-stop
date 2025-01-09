import {LocationDto} from './locationDto';

export class StationWithDistanceDto {
  constructor(
    public id?: number,
    public name?: string,
    public abbreviation?: string,
    public location?: LocationDto,
    public distance?: number,
  ) {
  }
}
