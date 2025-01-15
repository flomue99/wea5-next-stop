import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from   '../../../environments/environment';
import {TimelineSearchFilter} from '../../models/timeline-search-filter';
import {ConnectionDto} from '../../dtos/connectionDto';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    return of(null);
  }

  getConnectionsBetweenTwoStops(searchFilter: TimelineSearchFilter): Observable<ConnectionDto[]> {

    let params = {
      'FromStationId': searchFilter.fromStationId,
      'ToStationId': searchFilter.toStationId,
      'Date': searchFilter.date,
      'Time': searchFilter.time,
      'IsArrivalTime': searchFilter.isArrivalTime,
      'MaxConnections': searchFilter.maxConnections
    };

    return this.http.get<ConnectionDto[]>(`${environment.apiUrl}/connections`, {params: params})
      .pipe(
        catchError(this.errorHandler)
      );
  }
}
