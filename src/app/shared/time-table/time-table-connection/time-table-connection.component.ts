import {Component, Input, OnChanges} from '@angular/core';
import {Connection} from '../../../../shared/models/connection';
import {Timeline} from 'primeng/timeline';
import {PrimeTemplate} from 'primeng/api';
import {SubConnection} from '../../../../shared/models/subConnection';
import {TimelinePoint} from '../../../../shared/interfaces/timelinePoint';
import {Time} from '@angular/common';
import {Card} from 'primeng/card';

@Component({
  selector: 'wea5-time-table-connection',
  standalone: true,
  imports: [
    Timeline,
    PrimeTemplate,
    Card
  ],
  templateUrl: './time-table-connection.component.html',
  styles: ``
})
export class TimeTableConnectionComponent implements OnChanges {
  @Input() Connection: Connection = new Connection([]);
  timelinePoints: TimelinePoint[] = [];

  constructor() {
  }

  ngOnChanges(): void {
    this.timelinePoints = this.generateTimelinePoints(this.Connection.subConnections);
    console.log(this.timelinePoints);
  }

  //helper function to generate timeline points
  generateTimelinePoints(subConnections: SubConnection[]): TimelinePoint[] {
    const points: TimelinePoint[] = [];
    subConnections.forEach((subCon) => {
      points.push({
        routeId: subCon.routeId,
        delayInMinutes: subCon.delayInMinutes,
        type: 'departure',
        time: subCon.departureTime,
        stationId: subCon.fromStationId
      });
      points.push({
        routeId: subCon.routeId,
        delayInMinutes: subCon.delayInMinutes,
        type: 'arrival',
        time: subCon.arrivalTime,
        stationId: subCon.toStationId
      });
    });
    return points;
  }
}
