import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Location} from '../../models/location';
import {StationWithDistance} from '../../models/stationWithDistance';
import {Station} from '../../models/station';
import {StationForInsertDto} from '../../dtos/stationForInsertDto';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllFilteredStations(location: Location, searchString: string): Observable<StationWithDistance[]> {

    let params = {'latitude': location.latitude, 'longitude': location.longitude, 'searchString': searchString};

    return this.http.get<StationWithDistance[]>(`${environment.apiUrl}/stations/filtered`, {params: params})
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${environment.apiUrl}/stations`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(`${environment.apiUrl}/stations/${id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  updateStation(station: Station): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/stations/${station.id}`, station)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );

  }

  createStation(stationForInsertDto: StationForInsertDto): Observable<Station> {
    return this.http.post<Station>(`${environment.apiUrl}/stations`, stationForInsertDto)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }
}
