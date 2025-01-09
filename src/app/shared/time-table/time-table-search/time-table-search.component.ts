import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePicker} from 'primeng/datepicker';
import {PrimeTemplate} from 'primeng/api';
import {InputNumber} from 'primeng/inputnumber';
import {SelectButton} from 'primeng/selectbutton';
import {LocationDto} from '../../../../shared/dtos/locationDto';
import {StationWithDistanceDto} from '../../../../shared/dtos/stationWithDistanceDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {LocationService} from '../../../../shared/services/utils/location.service';
import {AutoComplete} from 'primeng/autocomplete';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {SearchFilter} from '../../../../shared/models/search-filter';
import {ConnectionService} from '../../../../shared/services/api/connection.service';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {ConnectionDto} from '../../../../shared/dtos/connectionDto';
import {Tooltip} from 'primeng/tooltip';
import {InputSwitch} from 'primeng/inputswitch';
import {Message} from 'primeng/message';

@Component({
  selector: 'wea5-time-table-search',
  standalone: true,
  imports: [
    InputGroup,
    InputGroupAddon,
    InputText,
    FormsModule,
    FloatLabel,
    Button,
    Card,
    DatePicker,
    PrimeTemplate,
    InputNumber,
    SelectButton,
    ButtonDirective,
    ReactiveFormsModule,
    AutoComplete,
    ButtonIcon,
    ButtonLabel,
    Tooltip,
    InputSwitch,
    NgIf,
    NgClass,
    Message
  ],
  providers: [DatePipe],
  templateUrl: './time-table-search.component.html',
  styles: ``
})
export class TimeTableSearchComponent implements OnInit {
  @Output() onConnectionsChange = new EventEmitter<ConnectionDto[]>();
  filterFormGroup!: FormGroup;
  filter!: SearchFilter;
  currentUserLocation!: LocationDto;
  stations: StationWithDistanceDto[] = [];
  submitted = false;

  stateOptions = [
    {label: 'Departure', value: false},
    {label: 'Arrival', value: true}
  ];

  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private locationService: LocationService,
    private connectionService: ConnectionService,
    private datePipe: DatePipe
  ) {
  }


  ngOnInit(): void {
    this.initFormGroup();
    this.locationService.getCurrenUserLocation().then((location) => {
      this.currentUserLocation = location;
      console.log(this.currentUserLocation);
    });
  }

  initFormGroup() {
    const currentDate = new Date();
    const currentTime = new Date();

    this.filterFormGroup = this.fb.group({
      fromStation: [null, Validators.required],
      toStation: [null, Validators.required],
      date: [currentDate, Validators.required],
      time: [currentTime, Validators.required],
      isArrivalTime: [false, Validators.required],
      maxConnections: [null, Validators.required]
    });

    this.filterFormGroup.valueChanges.subscribe(() => {
      this.submitted = false;
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


  onSubmit() {
    this.submitted = true;
    if (this.filterFormGroup.valid) {
      const formattedDate = this.datePipe.transform(this.filterFormGroup.value.date, 'yyyy-MM-ddTHH:mm:ss') || '';
      const formattedTime = this.datePipe.transform(this.filterFormGroup.value.time, 'HH:mm:ss') || '';
      this.filter = new SearchFilter(
        this.filterFormGroup.value.fromStation.id,
        this.filterFormGroup.value.toStation.id,
        formattedDate,
        formattedTime,
        this.filterFormGroup.value.isArrivalTime,
        this.filterFormGroup.value.maxConnections
      );
      this.connectionService.getConnectionsBetweenTwoStops(this.filter).subscribe({
        next: res => {
          this.onConnectionsChange.emit(res);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.initFormGroup();
    this.onConnectionsChange.emit([]);
  }
}
