/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ActivityLogModel } from '../../Models/ActivityLogModel';
import { Observable, of, switchMap } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivityLogHttpService } from '../../Services/ActivityLogService/ActivityLogService';

@Component({
  selector: 'app-activity-log-list',
  imports: [
    AsyncPipe, RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    DatePipe,
    
  ],
  templateUrl: './activity-log-list.component.html',
  styleUrl: './activity-log-list.component.css'
})
export class ActivityLogListComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private http : ActivityLogHttpService,
  
  ){}

 
  activityLogs$ : Observable<ActivityLogModel[]> | undefined;
  columnNames = ['activitynumber', 'employeenumber', 'unitsofwork', 'datetimebegin', 'datetimeend', 'resolved' ];
  
  ngOnInit(): void {
   
    this.getActivityLogs();
  }

  private getActivityLogs(){

    this.activityLogs$ = this.route.data.pipe(
            switchMap(data =>
              of(data['activitylogs']
    
              )) 
          );

  }

   refreshActivityLog($event?: Event){

    if($event != undefined){
      $event.preventDefault();
    }
    
    this.activityLogs$ = this.http.refresh();

  }

}
