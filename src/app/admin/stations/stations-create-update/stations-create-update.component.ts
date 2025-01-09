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
import {LocationDto} from '../../../../shared/dtos/locationDto';

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
    PrimeTemplate
  ],
  templateUrl: './stations-create-update.component.html',
  styles: ``
})
export class StationsCreateUpdateComponent implements OnInit {
  isUpdatingStation = false;
  id!: number;
  stationForm!: FormGroup;
  station: StationDto = new StationDto();


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
      abbreviation: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required]
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

  onSubmit() {
    if (this.stationForm.valid) {
      if (this.isUpdatingStation) {
        this.station.id = this.id;
        this.station.name = this.stationForm.value.name;
        this.station.abbreviation = this.stationForm.value.abbreviation;
        this.station.location = {
          latitude: this.stationForm.value.latitude,
          longitude: this.stationForm.value.longitude
        }
        this.stationsService.updateStation(this.station).subscribe(() => {
          this.router.navigate(['/stations']);
        });
      } else {
        const stationForInsertDto = new StationForInsertDto(
          this.stationForm.value.name,
          this.stationForm.value.abbreviation,
          new LocationDto(this.stationForm.value.latitude, this.stationForm.value.longitude)
        );
        this.stationsService.createStation(stationForInsertDto).subscribe(() => {
          this.router.navigate(['/stations']);
        });
      }
    }
  }
}
