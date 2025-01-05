import { Component } from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {DatePicker} from "primeng/datepicker";
import {FloatLabel} from "primeng/floatlabel";
import {InputNumber} from "primeng/inputnumber";
import {Message} from "primeng/message";
import {NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {SelectButton} from "primeng/selectbutton";

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
        SelectButton
    ],
  templateUrl: './indicator-board-search.component.html',
  styles: ``
})
export class IndicatorBoardSearchComponent {

}
