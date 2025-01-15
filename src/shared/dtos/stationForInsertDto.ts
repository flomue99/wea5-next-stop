import {LocationDto} from './locationDto';

export interface StationForInsertDto {
  name: string;
  abbreviation: string;
  location: LocationDto;
}
