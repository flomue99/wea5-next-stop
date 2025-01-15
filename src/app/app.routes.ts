import {Routes} from '@angular/router';
import {TimeTableComponent} from './shared/time-table/time-table.component';
import {HolidaysListComponent} from './admin/holidays/holidays-list/holidays-list.component';
import {HolidayCreateUpdateComponent} from './admin/holidays/holidays-create-update/holidays-create-update.component';
import {StationsListComponent} from './admin/stations/stations-list/stations-list.component';
import {StationsCreateUpdateComponent} from './admin/stations/stations-create-update/stations-create-update.component';
import {RoutesListComponent} from './admin/routes/routes-list/routes-list.component';
import {IndicatorBoardComponent} from './shared/indicator-board/indicator-board.component';
import {RoutesCreateUpdateComponent} from './admin/routes/routes-create-update/routes-create-update.component';
import {canNavigateToAdminGuard} from '../shared/guards/can-navigate-to-admin.guard';
import {LoginComponent} from './admin/login/login.component';
import {LoginPageComponent} from './admin/login-page/login-page.component';

export const routes: Routes = [
  {
    path: 'timetable',
    component: TimeTableComponent
  },
  {
    path: 'indicator-board',
    component: IndicatorBoardComponent
  },
  {
    path: 'holidays',
    component: HolidaysListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'holidays/create',
    component: HolidayCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'holidays/:id',
    component: HolidayCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'stations',
    component: StationsListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'stations/create',
    component: StationsCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'stations/:id',
    component: StationsCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'routes',
    component: RoutesListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'routes/create',
    component: RoutesCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'routes/:id',
    component: RoutesCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    redirectTo: '/timetable',
    pathMatch: 'full'
  }
];
