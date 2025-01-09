import {Component, OnInit} from '@angular/core';
import {RouteService} from '../../../../shared/services/api/route.service';
import {RouteDto} from '../../../../shared/dtos/routeDto';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {DatePipe, NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'wea5-routes-list',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    Card,
    Ripple,
    RouterLink,
    TableModule,
    Tooltip,
    DatePipe,
    Tag,
    NgIf
  ],
  templateUrl: './routes-list.component.html',
  styles: ``
})
export class RoutesListComponent implements OnInit {
  routes: RouteDto[] = [];

  constructor(private routeService: RouteService) {
  }

  ngOnInit() {
    this.routeService
      .getAllRoutes()
      .subscribe((routes) => {
        this.routes = routes;
        console.log(routes);
      });
  }
}
