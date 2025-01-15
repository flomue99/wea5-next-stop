import {StationWithoutDistanceAndIdDto} from './stationWithoutDistanceAndIdDto';

export interface DestinationBoardInfoDto {
  delayInSeconds: number;
  departureTime: string;
  routeNumber: number;
  endStation: StationWithoutDistanceAndIdDto;
}
