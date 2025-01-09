import {Component, OnInit} from '@angular/core';
import {TimeTableSearchComponent} from './time-table-search/time-table-search.component';
import {ConnectionDto} from '../../../shared/dtos/connectionDto';
import {TimeTableConnectionComponent} from './time-table-connection/time-table-connection.component';
import {DataView} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {Card} from 'primeng/card';

@Component({
  selector: 'wea5-time-table',
  standalone: true,
  imports: [
    TimeTableSearchComponent,
    TimeTableConnectionComponent,
    DataView,
    TableModule,
    Card
  ],
  templateUrl: './time-table.component.html',
  styles: ``
})
export class TimeTableComponent implements OnInit {
  connections: ConnectionDto[] = [];

  constructor() {
  }

  ngOnInit() {
    this.connections = [
      {
        "subConnections": [
          {
            "routeId": 3,
            "routeNr": 279,
            "fromStationId": 5,
            "toStationId": 19,
            "departureTime": "09:53:00",
            "arrivalTime": "10:41:00",
            "delayInMinutes": 0
          },
          {
            "routeId": 16,
            "routeNr": 16,
            "fromStationId": 19,
            "toStationId": 27,
            "departureTime": "15:45:00",
            "arrivalTime": "16:06:00",
            "delayInMinutes": 39
          }
        ]
      },
      {
        "subConnections": [
          {
            "routeId": 4,
            "routeNr": 279,
            "fromStationId": 5,
            "toStationId": 19,
            "departureTime": "11:53:00",
            "arrivalTime": "12:41:00",
            "delayInMinutes": 378
          },
          {
            "routeId": 16,
            "routeNr": 16,
            "fromStationId": 19,
            "toStationId": 27,
            "departureTime": "15:45:00",
            "arrivalTime": "16:06:00",
            "delayInMinutes": 39
          }
        ]
      },
      {
        "subConnections": [
          {
            "routeId": 5,
            "routeNr": 279,
            "fromStationId": 5,
            "toStationId": 19,
            "departureTime": "13:53:00",
            "arrivalTime": "14:41:00",
            "delayInMinutes": 5
          },
          {
            "routeId": 16,
            "routeNr": 16,
            "fromStationId": 19,
            "toStationId": 27,
            "departureTime": "15:45:00",
            "arrivalTime": "16:06:00",
            "delayInMinutes": 39
          }
        ]
      },
      {
        "subConnections": [
          {
            "routeId": 6,
            "routeNr": 279,
            "fromStationId": 5,
            "toStationId": 19,
            "departureTime": "15:53:00",
            "arrivalTime": "16:41:00",
            "delayInMinutes": 111
          },
          {
            "routeId": 17,
            "routeNr": 17,
            "fromStationId": 19,
            "toStationId": 27,
            "departureTime": "17:45:00",
            "arrivalTime": "18:06:00",
            "delayInMinutes": 0
          }
        ]
      }
    ];
  }

  onConnectionsChange(connections: ConnectionDto[]) {
    this.connections = connections;
  }
}
