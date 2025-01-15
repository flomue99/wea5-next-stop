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
import {debounceTime, distinctUntilChanged, min} from 'rxjs';
import {TimelineSearchFilter} from '../../../../shared/models/timeline-search-filter';
import {ConnectionService} from '../../../../shared/services/api/connection.service';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {ConnectionDto} from '../../../../shared/dtos/connectionDto';
import {Tooltip} from 'primeng/tooltip';
import {InputSwitch} from 'primeng/inputswitch';
import {Message} from 'primeng/message';
import {TimeTableSearchErrorMessages} from '../../../../shared/error-messages/time-table-search-error-messages';
import {stationsMustDifferValidator, stationValidator} from '../../../../shared/validators/stationValidators';

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
  filter!: TimelineSearchFilter;
  currentUserLocation!: LocationDto;
  stations: StationWithDistanceDto[] = [];
  submitted = false;
  errors: { [key: string]: string } = {};

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
    });
  }

  initFormGroup() {
    const currentDate = new Date();

    this.filterFormGroup = this.fb.group({
      fromStation: [null, [Validators.required, stationValidator()]],
      toStation: [null, [Validators.required, stationValidator()]],
      date: [currentDate, Validators.required],
      time: [currentDate, Validators.required],
      isArrivalTime: [false, Validators.required],
      maxConnections: [null, [Validators.required, Validators.min(1)]]
    }, {validators: stationsMustDifferValidator()});

    this.filterFormGroup.statusChanges.subscribe(() => {
      this.updateErrorMessages();
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

  updateErrorMessages() {
    this.errors = {};

    // check overall form error
    if (this.filterFormGroup.errors?.['stationsMustDiffer']) {
      this.errors['formError'] = 'From and To stations must be different.';
    }

    for (const message of TimeTableSearchErrorMessages) {
      if(this.filterFormGroup.get(message.forControl)?.errors?.[message.forValidator]) {
        this.errors[message.forControl] = message.text;
      }
      const control = this.filterFormGroup.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors != null &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }


  onSubmit() {
    this.updateErrorMessages();
    this.submitted = true;

    if (this.filterFormGroup.valid) {
      const formattedDate = this.datePipe.transform(this.filterFormGroup.value.date, 'yyyy-MM-ddTHH:mm:ss') || '';
      const formattedTime = this.datePipe.transform(this.filterFormGroup.value.time, 'HH:mm:ss') || '';
      this.filter = new TimelineSearchFilter(
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
    this.errors = {};
    this.submitted = false;
    this.initFormGroup();
    this.onConnectionsChange.emit([]);
  }
}
