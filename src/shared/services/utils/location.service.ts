import { Injectable } from '@angular/core';
import { Location } from '../../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrenUserLocation(): Promise<Location> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(new Location(position.coords.latitude, position.coords.longitude)));
    });
  }

}
