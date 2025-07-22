import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeDepartmentForEmployee } from '../../Models/EmployeeDepartmentForEmployee';
import { EmployeeDepartmentService } from '../../Services/EmployeeDepartment/employee-department.service';

@Component({
  selector: 'app-department-select',
  imports: [
    AsyncPipe, RouterModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './department-select.component.html',
  styleUrl: './department-select.component.css'
})
export class DepartmentSelectComponent implements OnInit{

  loading = false;
  submitted = false;

  constructor(private route: ActivatedRoute, private http: EmployeeDepartmentService){}

  columnNames = ['select', 'name', 'description'];

  departments$ : Observable<EmployeeDepartmentForEmployee[]> | undefined;
  employeeID : number = -1

  ngOnInit(): void {
    this.employeeID = Number(this.route.snapshot.params['id']);
    this.getDepartmentsForEmployee();
  }

  getDepartmentsForEmployee(){

   this.http.getAncillary(this.employeeID).subscribe(
    {
      next: (data)=>{

        this.departments$ = of(data);
      }
    }

   );

  }

  setDepartmentsForEmployee($event: any) {
    //this.activeValue = $event.checked;
    this.departments$!.subscribe({
      next: data=>{

        this.http.postAncillary(data,this.employeeID).subscribe({
          next: () =>{
            this.departments$ = of(data);
            alert("Departments saved successfully");

          }
        });;
 
      }
    })
  }

  handleSelectionChangeSelection($event : any, id : number){
  
       this.departments$!.subscribe({
        next: data=>{
  
          const ndx = data.findIndex(item=>item.department.id === id);
          const item : EmployeeDepartmentForEmployee = data[ndx];
          item.selected = $event.checked;
  
          this.departments$ = of(data);
  
        }
  
      })
    }
  

}
