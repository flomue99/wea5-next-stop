import {Component, OnInit} from '@angular/core';
import {TimeTableSearchComponent} from './time-table-search/time-table-search.component';
import {ConnectionDto} from '../../../shared/dtos/connectionDto';
import {TimeTableConnectionComponent} from './time-table-connection/time-table-connection.component';
import {DataView} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {Card} from 'primeng/card';
import {Message} from "primeng/message";

@Component({
  selector: 'wea5-time-table',
  standalone: true,
    imports: [
        TimeTableSearchComponent,
        TimeTableConnectionComponent,
        DataView,
        TableModule,
        Card,
        Message
    ],
  templateUrl: './time-table.component.html',
  styles: ``
})
export class TimeTableComponent {
  connections: ConnectionDto[] = [];

  constructor() {
  }
  onConnectionsChange(connections: ConnectionDto[]) {
    this.connections = connections;
  }
}
