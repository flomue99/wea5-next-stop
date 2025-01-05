import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {Menubar} from 'primeng/menubar';
import {Button} from 'primeng/button';

@Component({
  selector: 'wea5-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    PrimeTemplate,
    Menubar,
    Button
  ],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Timetable',
        icon: 'pi pi-calendar-clock',
        routerLink: 'timetable',
      },
      {
        label: 'Indicator Board',
        icon: 'pi pi-map',
        routerLink: 'indicator-board',
      },
      {
        label: 'Holidays',
        icon: 'pi pi-flag',
        routerLink: 'holidays',
      },
      {
        label: 'Stations',
        icon: 'pi pi-shop',
        routerLink: 'stations',
      },
      {
        label: 'Routes',
        icon: 'pi pi-directions',
        routerLink: 'routes',
      }
    ];
  }
}
