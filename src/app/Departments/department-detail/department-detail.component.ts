/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe} from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { PositionModel } from '../../Models/PositionModel';
import { PositionsHttpService } from '../../Services/Positions/positions.service';
import { DepartmentModel } from '../../Models/DepartmentModel';
import { DepartmentHttpService } from '../../Services/Departments/department-http-service.service';


@Component({
  selector: 'app-department-detail',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
  ],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.css'
})
export class DepartmentDetailComponent {

  departmentID : number | undefined;
  department$ : Observable<DepartmentModel> | undefined;

  constructor(
    private httpDepartmentService: DepartmentHttpService,
    private route: ActivatedRoute,
  )
  {

    this.departmentID = Number(this.route.snapshot.params['id']);
     httpDepartmentService.getItem(this.departmentID)!.subscribe({

      next: (value)=>{
              this.department$ = of(value);
            }

    })
  
  }

}
