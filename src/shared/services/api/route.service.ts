import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap} from 'rxjs';
import {RouteDto} from '../../dtos/routeDto';
import {environment} from '../../../environments/environment';
import {RouteWithRouteStopsDto} from '../../dtos/routeWithRouteStopsDto';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllRoutes(): Observable<RouteDto[]> {
    return this.http.get<RouteDto[]>(`${environment.apiUrl}/routes`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getRouteByIdWithRouteStops(id: number): Observable<RouteWithRouteStopsDto> {
    return this.http.get<RouteWithRouteStopsDto>(`${environment.apiUrl}/routes/${id}/routestops`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }
}
