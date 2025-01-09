import {Routes} from '@angular/router';
import {TimeTableComponent} from './shared/time-table/time-table.component';
import {HomeComponent} from './shared/home/home.component';
import {HolidaysListComponent} from './admin/holidays/holidays-list/holidays-list.component';
import {HolidayCreateUpdateComponent} from './admin/holidays/holidays-create-update/holidays-create-update.component';
import {StationsListComponent} from './admin/stations/stations-list/stations-list.component';
import {StationsCreateUpdateComponent} from './admin/stations/stations-create-update/stations-create-update.component';
import {RoutesListComponent} from './admin/routes/routes-list/routes-list.component';
import {IndicatorBoardComponent} from './shared/indicator-board/indicator-board.component';
import {RoutesCreateUpdateComponent} from './admin/routes/routes-create-update/routes-create-update.component';

export const routes: Routes = [
  {path: 'timetable', component: TimeTableComponent},
  {path: 'indicator-board', component: IndicatorBoardComponent},
  {path: 'holidays', component: HolidaysListComponent},
  {path: 'holidays/create', component: HolidayCreateUpdateComponent},
  {path: 'holidays/:id', component: HolidayCreateUpdateComponent},
  {path: 'stations', component: StationsListComponent},
  {path: 'stations/create', component: StationsCreateUpdateComponent},
  {path: 'stations/:id', component: StationsCreateUpdateComponent},
  {path: 'routes', component: RoutesListComponent },
  {path: 'routes/create', component: RoutesCreateUpdateComponent },
  {path: 'routes/:id', component: RoutesCreateUpdateComponent },
  {path: '', redirectTo: '/timetable', pathMatch: 'full'}
];
