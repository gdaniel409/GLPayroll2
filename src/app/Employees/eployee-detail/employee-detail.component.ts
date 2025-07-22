import { AsyncPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Observable, of } from 'rxjs';
import { EmployeeModel } from '../../Models/EmployeeModel';
import { ActivatedRoute } from '@angular/router';
import { EmployeePayrollHttpService } from '../../Services/EmployeePayroll/employee-payroll.service';

@Component({
  selector: 'app-eployee-detail',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
    DatePipe,
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  employeeID: number | undefined;
  statusID : number | undefined;
  employee$ : Observable<EmployeeModel | undefined> = of(undefined);

  constructor(
   
    private httpEmployeeService: EmployeePayrollHttpService,
    private route: ActivatedRoute,
    
   
  ) 
  {
  
    this.employeeID = Number(this.route.snapshot.params['id']);
    this.httpEmployeeService.getItem(this.employeeID)!.subscribe({
      next: (value)=>{
        this.employee$ = of(value);
        this.statusID = value.employeeStatus.id;
      }
 
    })
  }

  // handleStatusSelection($event: any) {

  // }

   

}
