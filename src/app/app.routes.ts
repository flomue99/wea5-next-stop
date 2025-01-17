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
import {LoginPageComponent} from './admin/login-page/login-page.component';
import {StatisticsComponent} from './shared/statistics/statistics.component';
import {NextStopRoutes} from '../shared/routes.constants';

export const routes: Routes = [
  {
    path: NextStopRoutes.TIMETABLE,
    component: TimeTableComponent
  },
  {
    path: NextStopRoutes.INDICATOR_BOARD,
    component: IndicatorBoardComponent
  },
  {
    path: NextStopRoutes.STATISTICS,
    component: StatisticsComponent
  },
  {
    path: NextStopRoutes.HOLIDAYS,
    component: HolidaysListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.HOLIDAYS_CREATE,
    component: HolidayCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.HOLIDAYS_EDIT,
    component: HolidayCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.STATIONS,
    component: StationsListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.STATIONS_CREATE,
    component: StationsCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.STATIONS_EDIT,
    component: StationsCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.ROUTES,
    component: RoutesListComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.ROUTES_CREATE,
    component: RoutesCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.ROUTES_EDIT,
    component: RoutesCreateUpdateComponent,
    canActivate: [canNavigateToAdminGuard]
  },
  {
    path: NextStopRoutes.LOGIN,
    component: LoginPageComponent
  },
  {
    path: NextStopRoutes.HOME,
    redirectTo: `/${NextStopRoutes.TIMETABLE}`,
    pathMatch: 'full'
  }
];
