import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RouteService} from '../../../../shared/services/api/route.service';
import {RouteWithRouteStopsDto} from '../../../../shared/dtos/routeWithRouteStopsDto';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePipe} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {RouteStopDto} from '../../../../shared/dtos/routeStopDto';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {StationService} from '../../../../shared/services/api/station.service';

@Component({
  selector: 'wea5-routes-create',
  standalone: true,
  imports: [
    Button,
    Card,
    DatePicker,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    Select,
    ButtonDirective,
    DatePipe,
    Ripple,
    TableModule,
    Tooltip
  ],
  templateUrl: './routes-create-update.component.html',
  styles: ``
})
export class RoutesCreateUpdateComponent implements OnInit {
  isDetailsView = false;
  id!: number;
  routeForm!: FormGroup;
  stations: StationDto[] = [];
  routeWithRouteStops!: RouteWithRouteStopsDto;

  constructor(
    private fb: FormBuilder,
    private routesService: RouteService,
    private stationService: StationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    if(this.id){
      this.isDetailsView = true;
      this.routesService.getRouteByIdWithRouteStops(this.id).subscribe(route => {
        this.routeWithRouteStops = route;
        console.log(this.routeWithRouteStops);
      });
      this.stationService.getAllStations().subscribe(stations => {
        this.stations = stations;
      });
    }
  }

  getStationName(stationId: number): string {
    const stationName = this.stations.find(s => s.id === stationId)?.name;
    return stationName ? stationName : '';
  }

  initForm() {

  }

  onRemoveRouteStop(routeStop: RouteStopDto) {

  }
}
