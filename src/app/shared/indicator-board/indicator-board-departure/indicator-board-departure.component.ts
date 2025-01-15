import {Component, Input} from '@angular/core';
import {Tag} from 'primeng/tag';
import {Timeline} from 'primeng/timeline';
import {ConnectionDto} from '../../../../shared/dtos/connectionDto';
import {DestinationBoardInfoDto} from '../../../../shared/dtos/destinationBoardInfoDto';
import {StationDto} from '../../../../shared/dtos/stationDto';

@Component({
  selector: 'wea5-indicator-board-departure',
  standalone: true,
  imports: [
    Tag,
    Timeline
  ],
  templateUrl: './indicator-board-departure.component.html',
  styles: ``
})
export class IndicatorBoardDepartureComponent {
  @Input() departure: DestinationBoardInfoDto = { delayInSeconds: 0, departureTime: "", routeNumber: 0, endStation: { name: '', abbreviation: '' }};
  @Input() fromStation: StationDto = { name: '', abbreviation: '' };
  timelineEvents: any[] = [1,2];

}
