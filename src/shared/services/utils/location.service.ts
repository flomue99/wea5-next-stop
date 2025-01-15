import { Injectable } from '@angular/core';
import { LocationDto } from '../../dtos/locationDto';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrenUserLocation(): Promise<LocationDto> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => resolve( { latitude: position.coords.latitude, longitude: position.coords.longitude}));
    });
  }

}
