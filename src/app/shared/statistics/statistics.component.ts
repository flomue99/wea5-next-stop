import {Component, OnInit} from '@angular/core';
import {Tag} from 'primeng/tag';
import {Timeline} from 'primeng/timeline';
import {AutoComplete} from 'primeng/autocomplete';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {DatePicker} from 'primeng/datepicker';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {StatisticService} from '../../../shared/services/api/statistic.service';
import {StatisticDto} from '../../../shared/dtos/statisticDto';
import {DatePipe} from '@angular/common';
import {UIChart} from 'primeng/chart';
import {RouteDto} from '../../../shared/dtos/routeDto';
import {RouteService} from '../../../shared/services/api/route.service';
import {Select} from 'primeng/select';
import {fromDateMustBeforeToDate} from '../../../shared/validators/statisticValidators';
import {StatisticErrorMessages} from '../../../shared/error-messages/statistic-error-messages';

@Component({
  selector: 'wea5-statistics',
  standalone: true,
  imports: [
    Tag,
    Timeline,
    AutoComplete,
    Card,
    FloatLabel,
    Message,
    DatePicker,
    ReactiveFormsModule,
    Button,
    FormsModule,
    UIChart,
    Select
  ],
  providers: [DatePipe],
  templateUrl: './statistics.component.html',
  styles: ``
})
export class StatisticsComponent implements OnInit {
  serverError: any;
  errors: { [key: string]: string } = {};
  statisticsForm!: FormGroup;
  statistics: StatisticDto[] = [];
  barCharData: any;
  barChartOptions: any;
  routesData: RouteDto[] = [];
  distinctRouteNumbers: number[] = [];

  constructor(
    private fb: FormBuilder,
    private statisticService: StatisticService,
    private datePipe: DatePipe,
    private routeService: RouteService
  ) {
  }

  ngOnInit(): void {

    this.routeService.getAllRoutes().subscribe({
      next: (data) => {
        this.routesData = data;
        this.distinctRouteNumbers = [...new Set(this.routesData.map(data => data.routeNumber))];
      },
      error: (error) => {
        this.serverError = error;
      }
    });

    this.statisticsForm = this.fb.group({
      routeNumber: [null,],
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
    }, {validators: [fromDateMustBeforeToDate()]});

    this.statisticsForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    this.initBarChart();
  }

  onSubmit(): void {
    if (this.statisticsForm.valid) {
      const formattedFromDate = this.datePipe.transform(this.statisticsForm.value.dateFrom, 'yyyy-MM-ddTHH:mm:ss') || '';
      const formattedToDate = this.datePipe.transform(this.statisticsForm.value.dateTo, 'yyyy-MM-ddTHH:mm:ss') || '';
      const searchFilter = {
        routeNumber: this.statisticsForm.value.routeNumber,
        fromDate: formattedFromDate,
        toDate: formattedToDate
      };

      this.statisticService.getStatisticsForRouteWithFromAndToDate(searchFilter).subscribe({
        next: (data) => {
          this.statistics = data;
          this.initBarChart();
          console.log(data);
        },
        error: (error) => {
          this.serverError = error;
        }
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};

    if (this.statisticsForm.errors?.['fromDateMustBeBeforeToDate']) {
      this.errors['formError'] = 'From date must be before To date.';
    }
    for (const message of StatisticErrorMessages) {
      if (this.statisticsForm.get(message.forControl)?.errors?.[message.forValidator]) {
        this.errors[message.forControl] = message.text;
      }
      const control = this.statisticsForm.get(message.forControl);
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

  private initBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.barCharData = {
      labels: this.statistics.map((stat) => `Route ${stat.routeNr}`),
      datasets: [
        {
          label: 'Accurate',
          data: this.statistics.map((stat) => stat.accuratePercentage),
          backgroundColor: 'rgba(145,218,119,0.2)',
          borderColor: 'rgb(153,200,96)',
          borderWidth: 1
        },
        {
          label: 'Slightly Delayed',
          data: this.statistics.map((stat) => stat.slightlyDelayedPercentage),
          backgroundColor: 'rgba(198,90,196,0.2)',
          borderColor: 'rgb(90,24,136)',
          borderWidth: 1
        },
        {
          label: 'Delayed',
          data: this.statistics.map((stat) => stat.delayedPercentage),
          backgroundColor: 'rgba(179,108,93,0.2)',
          borderColor: 'rgb(122,71,40)',
          borderWidth: 1
        },
        {
          label: 'Extreme Delayed',
          data: this.statistics.map((stat) => stat.extremeDelayedPercentage),
          backgroundColor: 'rgba(228,236,57,0.2)',
          borderColor: 'rgb(128,105,13)',
          borderWidth: 1
        }
      ]
    };

    this.barChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        title: {
          display: true,
          text: `Average Delay: ${this.statistics.map((stat) => stat.overallAverageDelay)} [s]`,
          color: textColor,
          font: {
            size: 14
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Percentage %',
            color: textColor
          },
          ticks: {
            color: textColor
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }


}
