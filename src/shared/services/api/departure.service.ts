import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap, throwError} from 'rxjs';
import {DepartureSearchFilter} from '../../models/departure-search-filter';
import {DestinationBoardInfoDto} from '../../dtos/destinationBoardInfoDto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartureService {

  constructor(private http: HttpClient) {
  }

  getAllDepartures(searchFilter:DepartureSearchFilter): Observable<DestinationBoardInfoDto[]> {
    let params = {
      'FromStationId': searchFilter.fromStationId,
      'Date': searchFilter.date,
      'Time': searchFilter.time,
      'MaxConnections': 999 //bad api design
    };
    return this.http.get<DestinationBoardInfoDto[]>(`${environment.apiUrl}/destinationboard`, {params: params})
      .pipe(
        retry(3),
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while fetching departures');
        })
      );
  }

}
