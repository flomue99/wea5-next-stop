import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Holiday} from '../../../../shared/models/holiday';
import {DatePipe} from '@angular/common';
import {Card} from 'primeng/card';
import {Button, ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {RouterLink} from '@angular/router';
import {HolidayService} from '../../../../shared/services/api/holiday.service';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'wea5-holidays-list',
  standalone: true,
  imports: [
    TableModule,
    DatePipe,
    Card,
    Button,
    Ripple,
    ButtonDirective,
    RouterLink,
    Tooltip,
    Dialog,
    Fieldset,
  ],
  templateUrl: './holidays-list.component.html',
  styles: ``
})
export class HolidaysListComponent implements OnInit {
  holidays: Holiday[] = [];
  deleteHolidayDialogVisible:boolean = false;
  selectedHolidayForDelete: Holiday | undefined;
  constructor(private holidaysService: HolidayService,) {
  }

  ngOnInit(): void {
    this.holidaysService
      .getAllHolidays()
      .subscribe((holidays) => {
        this.holidays = holidays;
      });
  }

  onShowDeleteHolidayDialog(holiday: Holiday) {
    this.deleteHolidayDialogVisible = true;
    this.selectedHolidayForDelete = holiday;
  }

  onDeleteSelectedHoliday() {
    if (this.selectedHolidayForDelete) {
      this.holidaysService
        .deleteHoliday(this.selectedHolidayForDelete)
        .subscribe(() => {
          //this.holidays = this.holidays.filter((holiday) => holiday.id !== this.selectedHolidayForDelete?.id);
          this.holidaysService
            .getAllHolidays()
            .subscribe((holidays) => {
              this.holidays = holidays;
            });
          this.deleteHolidayDialogVisible = false;
        });
    }
  }
}
