import {LocationDto} from './locationDto';

export interface StationDto {
  id?: number;
  name?: string;
  abbreviation?: string;
  location?: LocationDto;
}
