import {LocationDto} from './locationDto';

export interface StationWithDistanceDto {
  id?: number;
  name?: string;
  abbreviation?: string;
  location?: LocationDto;
  distance?: number;
}
