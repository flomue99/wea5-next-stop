import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {LocationDto} from '../../dtos/locationDto';
import {StationWithDistanceDto} from '../../dtos/stationWithDistanceDto';
import {StationDto} from '../../dtos/stationDto';
import {StationForInsertDto} from '../../dtos/stationForInsertDto';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient) {
  }


  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => error);
  }

  getAllFilteredStations(location: LocationDto, searchString: string): Observable<StationWithDistanceDto[]> {

    let params = {'latitude': location.latitude, 'longitude': location.longitude, 'searchString': searchString};

    return this.http.get<StationWithDistanceDto[]>(`${environment.apiUrl}/stations/filtered`, {params: params})
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getNearestStation(location: LocationDto): Observable<StationWithDistanceDto> {
    let params = {'latitude': location.latitude, 'longitude': location.longitude};

    return this.http.get<StationWithDistanceDto>(`${environment.apiUrl}/stations/filtered`, {params: params})
      .pipe(
        retry(3),
        catchError(this.errorHandler),
        map(stations => stations[0])
      );
  }

  getAllStations(): Observable<StationDto[]> {
    return this.http.get<StationDto[]>(`${environment.apiUrl}/stations`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getStationById(id: number): Observable<StationDto> {
    return this.http.get<StationDto>(`${environment.apiUrl}/stations/${id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  updateStation(station: StationDto): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/stations/${station.id}`, station)
      .pipe(
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while creating the station');
        })
      );

  }

  createStation(stationForInsertDto: StationForInsertDto): Observable<StationDto> {
    return this.http.post<StationDto>(`${environment.apiUrl}/stations`, stationForInsertDto)
      .pipe(
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while creating the station');
        })
      );
  }
}
