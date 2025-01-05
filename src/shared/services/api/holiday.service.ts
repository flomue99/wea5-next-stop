import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of, retry, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Holiday} from '../../models/holiday';
import {HolidayForInsertDto} from '../../dtos/holidayForInsertDto';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${environment.apiUrl}/holidays`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  getHolidayById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${environment.apiUrl}/holidays/${id}`)
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

  createHoliday(holiday: HolidayForInsertDto): Observable<Holiday> {
    return this.http.post<Holiday>(`${environment.apiUrl}/holidays`, holiday)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  updateHoliday(holiday: Holiday): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/holidays/${holiday.id}`, holiday)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

  deleteHoliday(holiday: Holiday): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/holidays/${holiday.id}`)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      );
  }

}
