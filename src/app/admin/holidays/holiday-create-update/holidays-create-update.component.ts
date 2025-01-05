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
import {HolidayForInsertDto} from '../../../../shared/dtos/holidayForInsertDto';
import {Holiday} from '../../../../shared/models/holiday';
import {InputNumber} from 'primeng/inputnumber';

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
    InputNumber
  ],
  templateUrl: './holidays-create-update.component.html',
  styles: ``
})
export class HolidayCreateUpdateComponent implements OnInit {
  isUpdatingHoliday = false;
  id!: number;
  holidayForm!: FormGroup;
  holiday: Holiday = new Holiday();

  types: Type[] = [
    {name: 'Public Holiday', type: 'PublicHoliday'},
    {name: 'School Holiday', type: 'SchoolHoliday '}]


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
      this.holidaysService.getHolidayById(this.id).subscribe((holiday: Holiday) => {
        this.holiday = holiday;
        this.updateForm();
      });
    }
  }

  initForm() {
    this.holidayForm = this.fb.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  updateForm() {
    this.holidayForm.patchValue({
      name: this.holiday.name,
      type: this.holiday.type === 'PublicHoliday' ? this.types[0] : this.types[1],
      fromDate: this.holiday.fromDate,
      toDate: this.holiday.toDate
    });
  }

  onSubmit() {
    console.log(this.holidayForm.value);
    if (this.holidayForm.valid) {
      //update
      if (this.isUpdatingHoliday) {
        this.holiday.id = this.id;
        this.holiday.name = this.holidayForm.value.name;
        this.holiday.type = this.holidayForm.value.type.type;
        this.holiday.fromDate = this.holidayForm.value.fromDate;
        this.holiday.toDate = this.holidayForm.value.toDate;

        this.holidaysService.updateHoliday(this.holiday).subscribe(() => {
          this.router.navigate(['/holidays']);
        });
      } else { //create
        const holidayForInsertDto = new HolidayForInsertDto(
          this.holidayForm.value.name,
          this.holidayForm.value.type.type,
          this.holidayForm.value.fromDate,
          this.holidayForm.value.toDate
        );
        //redirect to the created holiday with the id
        this.holidaysService.createHoliday(holidayForInsertDto).subscribe((res: Holiday) => {
          this.router.navigate(['/holidays'])
        });
      }
    }
  }
}
