import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RouteService} from '../../../../shared/services/api/route.service';
import {RouteWithRouteStopsDto} from '../../../../shared/dtos/routeWithRouteStopsDto';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {DatePipe} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {InputNumber} from 'primeng/inputnumber';
import {Calendar} from 'primeng/calendar';
import {Checkbox} from 'primeng/checkbox';
import {AutoComplete} from "primeng/autocomplete";
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {RouteStopDto} from '../../../../shared/dtos/routeStopDto';
import {RouteForInsertDto} from '../../../../shared/dtos/routeForInsertDto';
import {RouteStopForInsertDto} from '../../../../shared/dtos/routeStopForInsertDto';
import {RouteOperatingDaysForInsertDto} from '../../../../shared/dtos/routeOperatingDaysForInsertDto';

@Component({
  selector: 'wea5-routes-create',
  standalone: true,
  imports: [
    Button,
    Card,
    DatePicker,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    Select,
    ButtonDirective,
    DatePipe,
    Ripple,
    TableModule,
    Tooltip,
    InputNumber,
    Calendar,
    Checkbox,
    AutoComplete,
    FormsModule
  ],
  providers: [DatePipe],
  templateUrl: './routes-create-update.component.html',
  styles: ``
})
export class RoutesCreateUpdateComponent implements OnInit {
  isDetailsView = false;
  id!: number;
  routeForm!: FormGroup;
  stationForSearch: StationDto[] = [];
  stations: StationDto[] = [];
  routeWithRouteStops: RouteWithRouteStopsDto = {
    id: 0,
    routeNumber: 0,
    validFrom: new Date(),
    validTo: new Date(),
    routeOperatingDays: {routeId: 0, weekDays: false, weekends: false, publicHolidays: false, schoolHolidays: false},
    routeStops: []
  };

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private routesService: RouteService,
    private stationService: StationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    this.stationService.getAllStations().subscribe(stations => {
      this.stations = stations;
    });
    if (this.id) {
      this.isDetailsView = true;
      this.routesService.getRouteByIdWithRouteStops(this.id).subscribe({
        next: (route) => {
          this.routeWithRouteStops = route;
          this.updateForm();
        },
      });
    } else {
      this.routeWithRouteStops.routeStops = [];
    }

  }

  getStationName(stationId: number): string {
    const stationName = this.stations.find(s => s.id === stationId)?.name;
    return stationName ? stationName : '';
  }

  initForm() {
    this.routeForm = this.fb.group({
      stationSelection: this.fb.group({
        station: [null, Validators.required],
        departureTime: [null, Validators.required]
      }),
      routeNumber: [null, Validators.required],
      validFrom: [null, Validators.required],
      validTo: [null, Validators.required],
      weekDays: [false],
      weekends: [false],
      publicHolidays: [false],
      schoolHolidays: [false],
      routeStops: this.fb.array([])
    });
  }

  updateForm() {
    this.routeForm.patchValue({
      stationSelection: {
        station: null,
        departureTime: null
      },
      routeNumber: this.routeWithRouteStops.routeNumber,
      validFrom: this.routeWithRouteStops.validFrom,
      validTo: this.routeWithRouteStops.validTo,
      weekDays: this.routeWithRouteStops.routeOperatingDays.weekDays,
      weekends: this.routeWithRouteStops.routeOperatingDays.weekends,
      publicHolidays: this.routeWithRouteStops.routeOperatingDays.publicHolidays,
      schoolHolidays: this.routeWithRouteStops.routeOperatingDays.schoolHolidays
    });
  }

  filterStation(event: { query: string }) {
    this.stationService
      .getAllFilteredStations({latitude: 0, longitude: 0}, event.query)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((stations) => {
        this.stationForSearch = stations;
      });
  }

  onAddStation() {
    const stationSelection = this.stationSelectionForm;

    if (stationSelection.valid) {
      const { station, departureTime } = stationSelection.value;

      const routeStop: RouteStopDto = {
        routeId: 0,
        stationId: station.id,
        stationOrder: this.routeWithRouteStops.routeStops.length + 1,
        departureTime: departureTime
      };

      this.routeWithRouteStops.routeStops.push(routeStop);


      stationSelection.reset();
    }
  }


  private createRouteStopFormGroup(routeStop: RouteStopDto) {
    return this.fb.group({
      routeId: [routeStop.routeId],
      stationId: [routeStop.stationId, Validators.required],
      stationOrder: [routeStop.stationOrder, Validators.required],
      departureTime: [routeStop.departureTime, Validators.required]
    });
  }

  get stationSelectionForm() {
    return this.routeForm.get('stationSelection') as FormGroup;
  }



  onSubmit() {
    //if (this.routeForm.valid) {
    //update
    // Not implemented because no requirement
    if (this.isDetailsView) {

    } else { //create

      // transform routeStops tops into routeStops for insert
      const routeStopsForInsertDto: RouteStopForInsertDto[] = this.routeForm.value.routeStops.map((routeStop: RouteStopDto) => {
        return {
          stationId: routeStop.stationId,
          stationOrder: routeStop.stationOrder,
          departureTime: this.datePipe.transform(routeStop.departureTime, 'HH:mm:ss') || ''
        };
      });

      // transform operating days tops into operating days for insert

      const routeOperatingDaysForInsertDto: RouteOperatingDaysForInsertDto = {
        weekDays: this.routeForm.value.weekDays,
        weekends: this.routeForm.value.weekends,
        publicHolidays: this.routeForm.value.publicHolidays,
        schoolHolidays: this.routeForm.value.schoolHolidays
      }

      const routeForInsertDto: RouteForInsertDto = {
        routeNumber: this.routeForm.value.routeNumber,
        validFrom: this.routeForm.value.validFrom,
        validTo: this.routeForm.value.validTo,
        routeOperatingDays: routeOperatingDaysForInsertDto,
        routeStops: routeStopsForInsertDto
      };

      this.routesService.createRoute(routeForInsertDto).subscribe(() => {
          this.router.navigate(['/routes']);
        }
      );
    }
  }
}
