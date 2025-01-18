import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HolidayDto} from '../../dtos/holidayDto';
import {HolidayForInsertDto} from '../../dtos/holidayForInsertDto';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.error('An error occurred', error);
    return of(null);
  }

  getAllHolidays(): Observable<HolidayDto[]> {
    return this.http.get<HolidayDto[]>(`${environment.apiUrl}/holidays`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getHolidayById(id: number): Observable<HolidayDto> {
    return this.http.get<HolidayDto>(`${environment.apiUrl}/holidays/${id}`)
      .pipe(
        map(holiday => {
          if (holiday.fromDate) {
            holiday.fromDate = new Date(holiday.fromDate);
          }
          if (holiday.toDate) {
            holiday.toDate = new Date(holiday.toDate);
          }
          return holiday;
        }),
        retry(3),
        catchError(this.errorHandler)
      );
  }

  createHoliday(holiday: HolidayForInsertDto): Observable<HolidayDto> {
    return this.http.post<HolidayDto>(`${environment.apiUrl}/holidays`, holiday)
      .pipe(
        retry(2),
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while creating the holiday');
        })
      );
  }

  updateHoliday(holiday: HolidayDto): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/holidays/${holiday.id}`, holiday)
      .pipe(
        retry(2),
        catchError(error => {
          return throwError(() => error.error?.detail || 'An error occurred while updating the holiday');
        })
      );
  }

  deleteHoliday(holiday: HolidayDto): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/holidays/${holiday.id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

}
