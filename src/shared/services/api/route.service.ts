import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap} from 'rxjs';
import {RouteDto} from '../../dtos/routeDto';
import {environment} from '../../../environments/environment';
import {RouteWithRouteStopsDto} from '../../dtos/routeWithRouteStopsDto';
import {RouteForInsertDto} from '../../dtos/routeForInsertDto';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  private getHeaders(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.authenticationService.getAccessToken()}`
    };
  }

  private errorHandler(error: Error | any): Observable<any> {
    return of(null);
  }

  getAllRoutes(): Observable<RouteDto[]> {
    return this.http.get<RouteDto[]>(`${environment.apiUrl}/routes`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  createRoute(route: RouteForInsertDto): Observable<RouteDto> {
    return this.http.post<RouteDto>(`${environment.apiUrl}/routes`, route)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getRouteByIdWithRouteStops(id: number): Observable<RouteWithRouteStopsDto> {
    return this.http.get<RouteWithRouteStopsDto>(`${environment.apiUrl}/routes/${id}/routestops`)
      .pipe(
        map(route => {
          if (route.validFrom) {
            route.validFrom = new Date(route.validFrom);
          }
          if (route.validTo) {
            route.validTo = new Date(route.validTo);
          }
          route.routeStops.forEach(routeStop => {
            const depTimeStr = routeStop.departureTime.toString();
            const [hours, minutes, seconds] = depTimeStr.split(':');
            const date = new Date();
            date.setHours(parseInt(hours, 10));
            date.setMinutes(parseInt(minutes, 10));
            date.setSeconds(parseInt(seconds, 10));
            routeStop.departureTime = date;
          });
          return route;
        }),
        retry(3),
        catchError(this.errorHandler)
      );
  }
}
