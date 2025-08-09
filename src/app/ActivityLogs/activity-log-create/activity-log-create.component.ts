/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivityLogModel } from '../../Models/ActivityLogModel';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SubsidiaryHttpService } from '../../Services/SubPayroll/subsidiary-http-service.service';
import { ActivityLogHttpService } from '../../Services/ActivityLogService/ActivityLogService';
import { DateTimeComponent } from "../../Controls/DateTime/date-time/date-time.component";
import { DateTimeModel } from '../../Models/DateTimeModel';


@Component({
  selector: 'app-activity-log-create',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButton,
    DateTimeComponent
  ],
  templateUrl: './activity-log-create.component.html',
  styleUrl: './activity-log-create.component.css'
})
export class ActivityLogCreateComponent implements OnInit {

  @ViewChild('startDateTime') startDateComponentRef!: DateTimeComponent;
  @ViewChild('endDateTime') endDateComponentRef!: DateTimeComponent;

  startDateTime: DateTimeModel | undefined;
  endDateTime: DateTimeModel | undefined;

  handleEndDateChangeSelection($event: any) {
    this.endDateTime = $event;
  }
  handleStartDateChangeSelection($event: any) {
    this.startDateTime = $event;
  }

  activityLogForm!: FormGroup;
  activityID: number | undefined;
  activityNumber: string | undefined;

  employeeID: number | undefined;
  employeeNumber: string | undefined;

  loading = false;
  submitted = false;
  startDateLabel: string = "Start Date And Time";
  endDateLabel: string = "Stop Date And Time";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpActivityLogService: ActivityLogHttpService,

  ) {
    //inject api string
    this.httpActivityLogService.apiString = "activitylogmodel";
  }

  ngOnInit(): void {

    this.activityID = Number(this.route.snapshot.params['activityid']);
    this.activityNumber = this.route.snapshot.params['activitynumber'];

    this.employeeID = Number(this.route.snapshot.params['employeeid']);
    this.employeeNumber = this.route.snapshot.params['employeenumber'];


    this.activityLogForm = this.formBuilder.group({

      activitynumber: [this.activityNumber],
      employeenumber: [this.employeeNumber],
      unitsofwork: [0],
      dateBeginActivity: [],
      dateEndedActivity: [],


    });

  }

  onSubmit() {

    if (this.activityLogForm === undefined || this.activityLogForm.invalid) {
      return;
    }

    if(this.endDateTime == undefined){
      this.endDateComponentRef.hasErrors("Required");
    }

    if(this.startDateTime == undefined){
      this.startDateComponentRef.hasErrors("Required");
    }

    if(this.endDateTime == undefined || this.startDateTime == undefined){
      return;
    }
    this.submitted = true;
    this.loading = true;

    //create activity log here

    const activityLogModel: ActivityLogModel = {
      id: undefined,
      activityID: this.activityID,
      employeeID: this.employeeID,
      unitsOfWork: this.activityLogForm.value.unitsofwork,
      dateTimeBeginActivity: this.startDateTime?.dateTime,
      dateTimeEndActivity: this.endDateTime?.dateTime,
      activityNumber: this.activityNumber,
      employeeNumber: this.employeeNumber,
      resolved: false,
    }

    this.httpActivityLogService.addItem(activityLogModel).subscribe({
      next: (value) => {

        this.activityLogForm.reset();
        this.loading = false;
        this.submitted = false;
        this.endDateComponentRef.clearSelection();
        this.startDateComponentRef.clearSelection();
        this.startDateComponentRef.hasErrors("Required");
        this.endDateComponentRef.hasErrors("Required");

      }
    });


  }

}
