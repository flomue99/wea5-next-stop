import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Button} from 'primeng/button';
import {LoginComponent} from '../../admin/login/login.component';
import {AuthenticationService} from '../../../shared/services/auth/authentication.service';
import {NextStopRoutes} from '../../../shared/routes.constants';

@Component({
  selector: 'wea5-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    PrimeTemplate,
    Menubar,
    Button,
    LoginComponent
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(protected authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Timetable',
        icon: 'pi pi-calendar-clock',
        routerLink: NextStopRoutes.TIMETABLE,
      },
      {
        label: 'Departure Board',
        icon: 'pi pi-map',
        routerLink: NextStopRoutes.INDICATOR_BOARD,
      },
      {
        label: 'statistics',
        icon: 'pi pi-chart-bar',
        routerLink: NextStopRoutes.STATISTICS,
      }];

    if (this.authenticationService.isLoggedIn()) {
      this.items.push({
          label: 'Holidays',
          icon: 'pi pi-flag',
          routerLink: NextStopRoutes.HOLIDAYS,
        },
        {
          label: 'Stations',
          icon: 'pi pi-shop',
          routerLink: NextStopRoutes.STATIONS,
        },
        {
          label: 'Routes',
          icon: 'pi pi-directions',
          routerLink: NextStopRoutes.ROUTES,
        });
    }
  }
}
