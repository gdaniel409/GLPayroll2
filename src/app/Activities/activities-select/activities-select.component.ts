import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivitiesModel } from '../../Models/ActivitiesModel';
import { SubsidiaryHttpService } from '../../Services/SubPayroll/subsidiary-http-service.service';

@Component({
  selector: 'app-activities-select',
  imports: [AsyncPipe, RouterModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    
  ],
  
  templateUrl: './activities-select.component.html',
  styleUrl: './activities-select.component.css'
})
export class ActivitiesSelectComponent implements OnInit {

  employeeID: number | undefined;
  employeeNumber: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.employeeID = Number(this.route.snapshot.params['employeeid']);
    this.employeeNumber = this.route.snapshot.params['employeenumber'];

    this.getActivities();
  }

  activities$ : Observable<ActivitiesModel[]> | undefined;
  columnNames = ['edit','activitynumber','description' ];
   
  private getActivities()
  {
    this.activities$ = this.route.data.pipe(
            switchMap(data =>
              of(data['activities']
    
              )) 
          );
  }

}
