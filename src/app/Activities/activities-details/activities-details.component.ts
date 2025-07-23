/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component } from '@angular/core';
import { ActivitiesModel } from '../../Models/ActivitiesModel';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { ActivitiesHttpService } from '../../Services/Activities/activites.service';

@Component({
  selector: 'app-activities-details',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
   
  ],
 
  templateUrl: './activities-details.component.html',
  styleUrl: './activities-details.component.css'
})
export class ActivitiesDetailsComponent {

  activityID: number;
  activity$: Observable<ActivitiesModel | undefined> = of(undefined);

  constructor(
   
    private httpActivityService: ActivitiesHttpService,
    private route: ActivatedRoute,

  ) 
  {
    
    this.activityID = Number(this.route.snapshot.params['id']);
    httpActivityService.getItem(this.activityID)!.subscribe({

      next: (value)=>{
              this.activity$ = of(value);
            }

    })
  
  }

}
