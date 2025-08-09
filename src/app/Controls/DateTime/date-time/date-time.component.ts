import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { formatDate } from "@angular/common";
import { DateTimeModel as DateTimeModel } from '../../../Models/DateTimeModel';


@Component({
  selector: 'app-date-time',
  imports: [
    MatInputModule,
    MatDatepicker,
    MatInput,
    MatDatepickerModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent {
  clearSelection() {
    this.dateTimeModel = undefined;
    this.monthandyear = "";

    if (this.selectionChange !== undefined) {

      this.selectionChange.emit(this.dateTimeModel);

    }

  }

  monthandyear: string = "";
  ampm: string = "AM";
  time: string = "800";
  startDate: Date | undefined;
  error: string = "";
  currentTimeValue: number = 800;

  dateTimeModel: DateTimeModel | undefined;

  @Input() dateLabel: string | undefined;
  @Output() selectionChange = new EventEmitter<any>(); // Event for selection changes

  constructor(/* private datePipe: DatePipe */) {

    this.startDate = new Date();
    const nowDate = this.startDate.toDateString();

    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    this.monthandyear = formatDate(nowDate, format, locale);

    //create the default datetime
    this.dateTimeModel = new DateTimeModel();

    this.dateTimeModel.amPm = "AM";
    this.dateTimeModel
    this.dateTimeModel.month = this.startDate.getMonth();
    this.dateTimeModel.year = this.startDate.getFullYear();
    this.dateTimeModel.day = this.startDate.getDay();
    this.dateTimeModel.time = 800;
    this.dateTimeModel.dateTime = this.startDate;


  }

  hasErrors(err: string){

    this.error = err;
    
  }

  onMonthAndYearChanged(event: any) {

    const format = 'yyyy-MM-dd';
    const myDate = event.value;
    const locale = 'en-US';
    this.monthandyear = formatDate(myDate, format, locale);

    const parsedElements: string[] = this.monthandyear.split("-");

    this.dateTimeModel!.month = Number(parsedElements[1]);
    this.dateTimeModel!.day = Number(parsedElements[2]);
    this.dateTimeModel!.year = Number(parsedElements[0]);
    this.dateTimeModel?.calculateDateTime();

    if (this.selectionChange !== undefined) {
      this.selectionChange.emit(this.dateTimeModel);
    }

  }

  onAMPMSelectionChange(event: any): void {
    // this.selectionChange.emit(event.value);

    this.ampm = event.value;
    this.processTime();

    
  }

  onTimeSelectionChange(event: any) {

    this.currentTimeValue = Number(event.value);
    this.processTime();

  }

  private processTime(){

    this.dateTimeModel!.time = this.currentTimeValue;
   
    if (this.ampm == "PM") {
      this.dateTimeModel!.time += 1200;
    }

    this.dateTimeModel?.calculateDateTime();

    if (this.selectionChange !== undefined) {
      this.selectionChange.emit(this.dateTimeModel);
   }


  }

  compare(object1: any, object2: any) {
    return object1 && object2 && object1.toString() == object2.toString()
  }

}
