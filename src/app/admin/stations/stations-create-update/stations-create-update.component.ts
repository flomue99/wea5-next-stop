import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Select} from 'primeng/select';
import {StationDto} from '../../../../shared/dtos/stationDto';
import {StationService} from '../../../../shared/services/api/station.service';
import {StationForInsertDto} from '../../../../shared/dtos/stationForInsertDto';
import {InputNumber} from "primeng/inputnumber";
import {PrimeTemplate} from "primeng/api";
import {
  AddUpdateStationErrorMessages
} from '../../../../shared/error-messages/add-update-station-error-messages';
import {Message} from 'primeng/message';
import {NgIf} from '@angular/common';
import {NextStopRoutes} from '../../../../shared/routes.constants';

@Component({
  selector: 'wea5-stations-create-update',
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
    InputNumber,
    PrimeTemplate,
    Message,
    NgIf
  ],
  templateUrl: './stations-create-update.component.html',
  styles: ``
})
export class StationsCreateUpdateComponent implements OnInit {
  isUpdatingStation = false;
  id!: number;
  stationForm!: FormGroup;
  station: StationDto = {name: '', abbreviation: '', location: {latitude: 0, longitude: 0}};
  errors: { [key: string]: string } = {};
  serverError: any = null;

  constructor(
    private fb: FormBuilder,
    private stationsService: StationService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    if (this.id) {
      this.isUpdatingStation = true;
      this.stationsService.getStationById(this.id).subscribe((station) => {
        this.station = station;
        this.updateForm();
      });
    }
  }

  initForm() {
    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      abbreviation: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      latitude: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.required, Validators.min(-180), Validators.max(180)]]
    });

    this.stationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  updateForm() {
    this.stationForm.patchValue({
      name: this.station.name,
      abbreviation: this.station.abbreviation,
      latitude: this.station.location!.latitude,
      longitude: this.station.location!.longitude
    });
  }

  updateErrorMessages() {
    this.errors = {};


    for (const message of AddUpdateStationErrorMessages) {
      if (this.stationForm.get(message.forControl)?.errors?.[message.forValidator]) {
        this.errors[message.forControl] = message.text;
      }
      const control = this.stationForm.get(message.forControl);
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
    if (this.stationForm.valid) {
      this.stationForm.disable();
      this.serverError = null;

      if (this.isUpdatingStation) {
        this.station.id = this.id;
        this.station.name = this.stationForm.value.name;
        this.station.abbreviation = this.stationForm.value.abbreviation;
        this.station.location = {
          latitude: this.stationForm.value.latitude,
          longitude: this.stationForm.value.longitude
        }
        this.stationsService.updateStation(this.station).subscribe({
          next: () => {
            this.router.navigate(['/' + NextStopRoutes.STATIONS]);
          },
          error: (errorMessage) => {
            this.serverError = errorMessage;
            this.stationForm.enable();
          }
        });
      } else {
        const stationForInsertDto: StationForInsertDto = {
          name: this.stationForm.value.name,
          abbreviation: this.stationForm.value.abbreviation,
          location: {
            latitude: this.stationForm.value.latitude,
            longitude: this.stationForm.value.longitude,
          },
        };

        this.stationsService.createStation(stationForInsertDto).subscribe({
          next: () => {
            this.router.navigate(['/' + NextStopRoutes.STATIONS]);
          },
          error: (errorMessage) => {
            this.serverError = errorMessage;
            this.stationForm.enable();
          }
        });
      }
    }
  }

  protected readonly NextStopRoutes = NextStopRoutes;
}
