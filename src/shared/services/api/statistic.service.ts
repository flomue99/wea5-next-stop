import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StatisticSearchFilter} from '../../models/statistic-search-filter';
import {StatisticDto} from '../../dtos/statisticDto';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) {
  }

  getStatisticsForRouteWithFromAndToDate(searchFilter: StatisticSearchFilter): Observable<StatisticDto[]> {

    let params;
    if (searchFilter.routeNumber === null || searchFilter.routeNumber === undefined) {
      params = {
        'FromDate': searchFilter.fromDate,
        'ToDate': searchFilter.toDate
      };

    } else {
      params = {
        'FromDate': searchFilter.fromDate,
        'ToDate': searchFilter.toDate,
        'RouteNr': searchFilter.routeNumber,
      };
    }


    return this.http.get<StatisticDto[]>(`${environment.apiUrl}/statistics`, {params: params})
      .pipe(
        retry(3),
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while fetching connections');
        })
      );
  }
}
