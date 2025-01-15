import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ConnectionDto} from '../../../../shared/dtos/connectionDto';
import {Timeline} from 'primeng/timeline';
import {PrimeTemplate} from 'primeng/api';
import {SubConnectionDto} from '../../../../shared/dtos/subConnectionDto';
import {NgClass, NgIf, Time} from '@angular/common';
import {Card} from 'primeng/card';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {Tag} from 'primeng/tag';


@Component({
  selector: 'wea5-time-table-connection',
  standalone: true,
  imports: [
    Timeline,
    PrimeTemplate,
    Card,
    NgClass,
    NgIf,
    Tag
  ],
  templateUrl: './time-table-connection.component.html',
  styles: ``
})
export class TimeTableConnectionComponent implements OnInit {
  @Input() connection: ConnectionDto = { subConnections: [] };
  timelineEvents: any[] = [];
  fromStation: StationDto = { name: '', abbreviation: '' };
  toStation: StationDto = { name: '', abbreviation: '' };

  constructor(private stationService: StationService) {

  }

  ngOnInit() {
    const subConnections = this.connection.subConnections;

    this.stationService.getStationById(subConnections[0].fromStationId).subscribe(station => {
      this.fromStation = station;
    });
    this.stationService.getStationById(subConnections[subConnections.length - 1].toStationId).subscribe(station => {
      this.toStation = station;
    });

    this.timelineEvents = this.createTimelineEvents(subConnections);
  }

  private createTimelineEvents(subConnections: SubConnectionDto[]): any[] {
    const events: any[] = [];

    subConnections.forEach((conn, index) => {
      if (index === 0) {
        events.push(index);
      }

      if (index < subConnections.length - 1) {
        events.push(index);
      }

      if (index === subConnections.length - 1) {
        events.push(index);
      }
    });

    return events;
  }
}
