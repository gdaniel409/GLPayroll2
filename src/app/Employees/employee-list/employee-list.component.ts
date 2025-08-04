/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { EmployeeModel} from '../../Models/EmployeeModel';

import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatRow } from '@angular/material/table';
import { EmployeePayrollHttpService } from '../../Services/EmployeePayroll/employee-payroll.service';
import { CommonModule } from '@angular/common';
import { RowSelectorService } from '../../Services/RowSelector/row-selector.service';

@Component({
  selector: 'app-employee-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatTableModule,
    MatRow,
    CommonModule,
  
   
],
  
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private http : EmployeePayrollHttpService,
    public rowIndex: RowSelectorService, 
  )
  {}

  

  highlight(row: any) {
   
    this.rowIndex.rowIndex = row.id;
  }

  highlightEmployeeID(employeeID : number){
    this.rowIndex.rowIndex = employeeID;
  }
 
  ngOnInit(): void {

    this.getEmployees();
      
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees$ = this.http.filterEmployeeList(filterValue);
  }

  employees$ : Observable<EmployeeModel[]> | undefined;
  //selectedEmployee: EmployeeModel | undefined;
  columnNames = ['employeenumber', 'title', 'firstname', 'lastname', 'status', 'edit' ];
 
  private getEmployees() {

      this.employees$ = this.route.data.pipe(
        switchMap(data =>
           of(data['employees']
   
          )) 
      );
   
  }

  refreshEmployees($event?: Event){

    if($event !== undefined)
    {
      $event.preventDefault();
    }
    
    this.employees$ = this.http.refresh();

  }

}



