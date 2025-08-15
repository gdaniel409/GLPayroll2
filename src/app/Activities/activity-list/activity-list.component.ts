/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ActivitiesModel } from '../../Models/ActivitiesModel';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { ActivitiesHttpService } from '../../Services/Activities/activites.service';
import { IHttp } from '../../Interfaces/IHttp';

@Component({
  selector: 'app-activity-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatTable,

  ],

  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent implements OnInit {

  constructor(public route: ActivatedRoute, private http: ActivitiesHttpService) { }


  ngOnInit(): void {

    this.getActivities();
  }

  activities$: Observable<ActivitiesModel[]> | undefined;
  columnNames = ['activitynumber', 'description', 'active', 'edit'];

  private getActivities() {
    this.activities$ = this.route.data.pipe(
      switchMap(data =>
        of(data['activities']

        ))
    );

  }

  refreshActivities($event?: Event): void {

    if ($event != undefined) {
      $event.preventDefault();
    }

    this.activities$ = this.http.refresh();

  }

}
