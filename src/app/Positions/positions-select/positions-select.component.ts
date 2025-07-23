/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeePositionForEmployee } from '../../Models/EmployeePositionForEmployee';
import { EmployeePositionService } from '../../Services/EmployeePosition/employee-position.service';

@Component({
  selector: 'app-positions-select',
  imports: [
    AsyncPipe, RouterModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './positions-select.component.html',
  styleUrl: './positions-select.component.css'
})
export class PositionsSelectComponent {

  loading = false;
  submitted = false;

  constructor(private route: ActivatedRoute, 
    private http: EmployeePositionService){}

  columnNames = ['select', 'name', 'description'];

  positions$ : Observable<EmployeePositionForEmployee[]> | undefined;
  employeeID : number = -1
  employeeNumber : string = "";
  
  ngOnInit(): void {

    this.employeeID = Number(this.route.snapshot.params['id']);
    this.employeeNumber = this.route.snapshot.params['number'];

    this.getPositionsForEmployee();
  }

  refreshPositionsForEmployee($event?: Event){

    if($event != undefined){
      $event.preventDefault();
    }

    this.positions$ = this.http.refresh(this.employeeID);

  }

  getPositionsForEmployee(){

   this.positions$ = this.http.getAncillary(this.employeeID);

  }

  setPositionsForEmployee($event: any) {
    this.positions$!.subscribe({
      next: data=>{

        this.http.postAncillary(data, this.employeeID).subscribe({
          next: () =>{
            this.positions$ = of(data);
            alert("Positions saved successfully");

          }
        });

      }
    })
  }

  handleSelectionChangeSelection($event : any, id : number){

     this.positions$!.subscribe({
      next: data=>{

        const ndx = data.findIndex(item=>item.position.id === id);
        const item : EmployeePositionForEmployee = data[ndx];
        item.selected = $event.checked;

        this.positions$ = of(data);

      }

    })
  }

}
