import {Component, OnInit} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button, ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TableModule} from 'primeng/table';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {HolidayService} from '../../../../shared/services/api/holiday.service';
import {HolidayDto} from '../../../../shared/dtos/holidayDto';
import {InputNumber} from 'primeng/inputnumber';
import {AddUpdateHolidayErrorMessages} from '../../../../shared/error-messages/add-update-holiday-error-messages';
import {
  datesMustBeSame,
  datesMustDiffer,
  fromDateMustBeforeToDate
} from '../../../../shared/validators/holidayValidators';
import {Message} from 'primeng/message';
import {NextStopRoutes} from '../../../../shared/routes.constants';

interface Type {
  name: string;
  type: string;
}

@Component({
  selector: 'wea5-holidays-create',
  standalone: true,
  imports: [
    Dialog,
    Button,
    ButtonDirective,
    Card,
    DatePipe,
    Ripple,
    RouterLink,
    TableModule,
    DatePicker,
    FloatLabel,
    ReactiveFormsModule,
    InputText,
    FormsModule,
    Select,
    InputNumber,
    Message
  ],
  templateUrl: './holidays-create-update.component.html',
  styles: ``
})
export class HolidayCreateUpdateComponent implements OnInit {
  isUpdatingHoliday = false;
  id!: number;
  holidayForm!: FormGroup;
  holiday: HolidayDto = {name: '', type: '', fromDate: new Date(), toDate: new Date()};
  errors: { [key: string]: string } = {};
  serverError: any = null;

  types: Type[] = [
    {name: 'Public Holiday', type: 'PublicHoliday'},
    {name: 'School Holiday', type: 'SchoolHoliday'}]


  constructor(
    private fb: FormBuilder,
    private holidaysService: HolidayService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.initForm();
    if (this.id) {
      this.isUpdatingHoliday = true;
      this.holidaysService.getHolidayById(this.id).subscribe((holiday: HolidayDto) => {
        this.holiday = holiday;
        this.updateForm();
      });
    }
  }

  initForm() {
    this.holidayForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });

    this.holidayForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    this.holidayForm.get('type')?.valueChanges.subscribe(() => {
      this.updateValidators();
      this.updateErrorMessages();
    });

  }

  updateValidators() {
    const typeControl = this.holidayForm.get('type');

    if (typeControl?.value.type === 'SchoolHoliday') {
      this.holidayForm.setValidators([datesMustDiffer(), fromDateMustBeforeToDate()]);
    } else if (typeControl?.value.type === 'PublicHoliday') {
      this.holidayForm.setValidators([datesMustBeSame()]);
    }

    this.holidayForm.updateValueAndValidity();
  }


  updateForm() {
    this.holidayForm.patchValue({
      name: this.holiday.name,
      type: this.holiday.type === 'PublicHoliday' ? this.types[0] : this.types[1],
      fromDate: this.holiday.fromDate,
      toDate: this.holiday.toDate
    });

    this.updateValidators();
  }

  updateErrorMessages() {
    this.errors = {};

    // check overall form error
    if (this.holidayForm.errors?.['datesMustDiffer']) {
      this.errors['formError'] = 'From and To date must be different.';
    }

    if (this.holidayForm.errors?.['fromDateMustBeBeforeToDate']) {
      this.errors['formError'] = 'From date must be before To date.';
    }

    if (this.holidayForm.errors?.['datesMustBeSame']) {
      this.errors['formError'] = 'Dates must be the same.';
    }

    for (const message of AddUpdateHolidayErrorMessages) {
      if (this.holidayForm.get(message.forControl)?.errors?.[message.forValidator]) {
        this.errors[message.forControl] = message.text;
      }
      const control = this.holidayForm.get(message.forControl);
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
    if (this.holidayForm.valid) {
      this.serverError = null;
      //update
      if (this.isUpdatingHoliday) {
        this.holiday.id = this.id;
        this.holiday.name = this.holidayForm.value.name;
        this.holiday.type = this.holidayForm.value.type.type;
        this.holiday.fromDate = this.holidayForm.value.fromDate;
        this.holiday.toDate = this.holidayForm.value.toDate;

        this.holidayForm.disable();
        this.holidaysService.updateHoliday(this.holiday).subscribe({
          next: () => {
            this.router.navigate(['/' + NextStopRoutes.HOLIDAYS]);
          },
          error: (errorMessage) => {
            this.serverError = errorMessage;
            this.holidayForm.enable();
          }
        });
      } else { //create
        const holidayForInsertDto = {
          name: this.holidayForm.value.name,
          type: this.holidayForm.value.type.type,
          fromDate: this.holidayForm.value.fromDate,
          toDate: this.holidayForm.value.toDate
        };
        //redirect to the created holiday with the id
        this.holidayForm.disable();
        this.holidaysService.createHoliday(holidayForInsertDto).subscribe({
          next: () => {
            this.router.navigate(['/' + NextStopRoutes.HOLIDAYS]);
          },
          error: (errorMessage) => {
            this.serverError = errorMessage;
            this.holidayForm.enable();
          }
        });
      }
    }
  }

  protected readonly NextStopRoutes = NextStopRoutes;
}
