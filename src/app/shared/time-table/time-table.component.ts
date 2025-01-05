import { Component } from '@angular/core';
import {TimeTableSearchComponent} from './time-table-search/time-table-search.component';
import {Connection} from '../../../shared/models/connection';
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
export class TimeTableComponent {
  connections: Connection[] = [];

  constructor() {
  }

  onConnectionsChange(connections: Connection[]) {
    this.connections = connections;
  }
}
