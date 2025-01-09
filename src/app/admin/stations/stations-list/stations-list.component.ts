import {Component, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {Card} from "primeng/card";
import {DatePipe} from "@angular/common";
import {Dialog} from "primeng/dialog";
import {Fieldset} from "primeng/fieldset";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {StationWithDistanceDto} from '../../../../shared/dtos/stationWithDistanceDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {HolidayDto} from '../../../../shared/dtos/holidayDto';

@Component({
  selector: 'wea5-stations-list',
  standalone: true,
    imports: [
        Button,
        ButtonDirective,
        Card,
        DatePipe,
        Dialog,
        Fieldset,
        Ripple,
        RouterLink,
        TableModule,
        Tooltip
    ],
  templateUrl: './stations-list.component.html',
  styles: ``
})
export class StationsListComponent implements OnInit {
  stations: StationDto[] = [];
  constructor(private stationsService: StationService) {
  }

  ngOnInit() {
    this.stationsService
      .getAllStations()
      .subscribe((stations) => {
        this.stations = stations;
      });
  }
}
