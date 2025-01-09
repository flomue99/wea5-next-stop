import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ConnectionDto} from '../../../../shared/dtos/connectionDto';
import {Timeline} from 'primeng/timeline';
import {PrimeTemplate} from 'primeng/api';
import {SubConnectionDto} from '../../../../shared/dtos/subConnectionDto';
import {TimelinePoint} from '../../../../shared/interfaces/timelinePoint';
import {NgClass, NgIf, Time} from '@angular/common';
import {Card} from 'primeng/card';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {Tag} from 'primeng/tag';


interface TimelineEvent {
  label: string;
  time: string;
  type: 'departure' | 'transfer' | 'arrival';
  routeNumber?: number;
}


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
  @Input() connection: ConnectionDto = new ConnectionDto([]);
  timelineEvents: TimelineEvent[] = [];
  fromStation: StationDto = new StationDto();
  toStation: StationDto = new StationDto();
  constructor(private stationService : StationService) {

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

  private createTimelineEvents(subConnections: SubConnectionDto[]): TimelineEvent[] {
    const events: TimelineEvent[] = [];

    subConnections.forEach((conn, index) => {
      if (index === 0) {
        events.push({
          label: 'Departure',
          time: conn.departureTime,
          type: 'departure',
          routeNumber: conn.routeNr
        });
      }

      if (index < subConnections.length - 1) {
        events.push({
          label: 'Transfer',
          time: conn.arrivalTime,
          type: 'transfer',
          routeNumber: subConnections[index + 1].routeNr
        });
      }

      if (index === subConnections.length - 1) {
        events.push({
          label: 'Arrival',
          time: conn.arrivalTime,
          type: 'arrival'
        });
      }
    });

    return events;
  }


}
