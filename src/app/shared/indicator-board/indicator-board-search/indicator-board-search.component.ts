import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {DatePicker} from "primeng/datepicker";
import {FloatLabel} from "primeng/floatlabel";
import {InputNumber} from "primeng/inputnumber";
import {Message} from "primeng/message";
import {DatePipe, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectButton} from "primeng/selectbutton";
import {StationWithDistanceDto} from '../../../../shared/dtos/stationWithDistanceDto';
import {LocationDto} from '../../../../shared/dtos/locationDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {LocationService} from '../../../../shared/services/utils/location.service';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {DestinationBoardInfoDto} from '../../../../shared/dtos/destinationBoardInfoDto';
import {DepartureService} from '../../../../shared/services/api/departure.service';
import {DepartureSearchFilter} from '../../../../shared/models/departure-search-filter';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {stationValidator} from '../../../../shared/validators/stationValidators';
import {TimeTableSearchErrorMessages} from '../../../../shared/error-messages/time-table-search-error-messages';

@Component({
  selector: 'wea5-indicator-board-search',
  standalone: true,
  imports: [
    AutoComplete,
    Button,
    Card,
    DatePicker,
    FloatLabel,
    InputNumber,
    Message,
    NgIf,
    PrimeTemplate,
    ReactiveFormsModule,
    SelectButton,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './indicator-board-search.component.html',
  styles: ``
})
export class IndicatorBoardSearchComponent implements OnInit {
  @Output() onDeparturesChange = new EventEmitter<DestinationBoardInfoDto[]>();
  @Output() onFromStationChange = new EventEmitter<number>();
  stations: StationWithDistanceDto[] = [];
  selectedStation: StationWithDistanceDto = { id: 0, name: '', abbreviation: '', location: { latitude: 0, longitude: 0 }, distance: 0 };
  currentUserLocation!: LocationDto;
  departures: DestinationBoardInfoDto[] = [];


  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private locationService: LocationService,
    private departureService: DepartureService,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.locationService.getCurrenUserLocation().then((location) => {
      this.currentUserLocation = location
      this.stationService.getNearestStation(location).subscribe(stations => {
        this.selectedStation = stations;
        this.loadDepartures();
      });
    });
  }

  loadDepartures() {
    const date = new Date();
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') || '';
    const formattedTime = this.datePipe.transform(date, 'HH:mm:ss') || '';

    this.departureService.getAllDepartures(new DepartureSearchFilter(this.selectedStation.id!, formattedDate, formattedTime)).subscribe(departures => {
      this.departures = departures
      this.onDeparturesChange.emit(departures);
      this.onFromStationChange.emit(this.selectedStation.id);
    });
  }

  filterStation(event: { query: string }) {
    this.stationService
      .getAllFilteredStations(this.currentUserLocation, event.query)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((stations) => {
        this.stations = stations;
      });
  }

  onSelectStation(event: any) {
    this.selectedStation = event.value;
    this.loadDepartures();
  }
}
