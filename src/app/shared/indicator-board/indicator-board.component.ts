import { Component } from '@angular/core';
import {IndicatorBoardSearchComponent} from './indicator-board-search/indicator-board-search.component';
import {ConnectionDto} from '../../../shared/dtos/connectionDto';
import {DestinationBoardInfoDto} from '../../../shared/dtos/destinationBoardInfoDto';
import {Card} from 'primeng/card';
import {IndicatorBoardDepartureComponent} from './indicator-board-departure/indicator-board-departure.component';
import {StationDto} from '../../../shared/dtos/stationDto';
import {StationService} from '../../../shared/services/api/station.service';
import {Message} from 'primeng/message';

@Component({
  selector: 'wea5-indicator-board',
  standalone: true,
  imports: [
    IndicatorBoardSearchComponent,
    Card,
    IndicatorBoardDepartureComponent,
    Message
  ],
  templateUrl: './indicator-board.component.html',
  styles: ``
})
export class IndicatorBoardComponent {
  departures: DestinationBoardInfoDto[] = [];
  fromStation: StationDto = {name: '', abbreviation: ''};

  constructor(private statioService: StationService) {
  }

  onFromStationChange(stationID: number) {
    this.statioService.getStationById(stationID).subscribe(station => {
      this.fromStation = station;
    });
  }

  onDeparturesChange(departures: DestinationBoardInfoDto[]) {
    this.departures = departures;
  }
}
