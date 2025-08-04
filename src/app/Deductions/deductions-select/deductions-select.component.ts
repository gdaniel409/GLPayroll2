/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AncillaryHttpService } from '../../Services/AncilliaryService/ancilliray.service';
import { EmployeeDeductionForEmployee } from '../../Models/EmployeeDeductionForEmployee';
import { EmployeeDeductionForEmployeePartial } from '../../Models/EmployeeDeductionForEmployeePartial';
import { EmployeeDeductionService } from '../../Services/EmployeeDeduction/employee-deduction.service';

@Component({
  selector: 'app-deductions-select',
  imports: [
    AsyncPipe, RouterModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './deductions-select.component.html',
  styleUrl: './deductions-select.component.css'
})
export class DeductionsSelectComponent {

  loading = false;
  submitted = false;
  testVar = 'Test Variable';

  constructor(private route: ActivatedRoute,
    private httpGet: EmployeeDeductionService<EmployeeDeductionForEmployee>,
    private httpPost: EmployeeDeductionService<EmployeeDeductionForEmployeePartial>){}

    
  //columnNames = ['select', 'name', 'description', 'deductiontype', 'amount', 'percentage', 'paymetric'];

  columnNames = ['select','name','description'];

  deductions$ : Observable<EmployeeDeductionForEmployee[]> | undefined;
 
  employeeID : number = -1;
  employeeNumber: string = "";

  ngOnInit(): void {

    this.employeeID = Number(this.route.snapshot.params['id']);
    this.employeeNumber = this.route.snapshot.params['number'];

    this.getDeductionsForEmployee();
  }

  refreshDeductionsForEmployee($event?: Event){

    if($event != undefined){
      $event.preventDefault();
    }

    this.deductions$ = this.httpGet.refresh(this.employeeID);

  }
  getDeductionsForEmployee(){

    this.deductions$ = this.httpGet.getAncillary(this.employeeID);

  }

  setDeductionsForEmployee($event: any) {

    const dataPartials : EmployeeDeductionForEmployeePartial[] = [];
   
    this.deductions$!.subscribe({
      next: data=>{

        data.forEach(function(value){

            const dataPartial : EmployeeDeductionForEmployeePartial = {
            selected: value.selected,
            id: value.deduction.id!,
           

          }

          dataPartials.push(dataPartial);
          

        });
     
        this.httpPost.postAncillary(dataPartials, this.employeeID).subscribe({
          next: () =>{
            this.deductions$ = of(data);
            alert("Deductonss saved successfully");

          }
        });
        

      }
    })

   
  }

  onCheckAllSelection($event : any){

   // $event.preventDefault();

   
    if($event.checked)
    {

      this.deductions$?.subscribe({

        next: (data)=>{
          data.forEach((item)=>
          {
            item.selected = true;
          })

          this.deductions$ = of(data);
        }
      })

    }
    else
    {

      this.deductions$?.subscribe({

        next: (data)=>{
          data.forEach((item)=>
          {
            item.selected = false;
          })

          this.deductions$ = of(data);
        }
      })

    }
  
  }

  handleSelectionChangeSelection($event : any, id : number){
    
         this.deductions$!.subscribe({
          next: data=>{
    
            const ndx = data.findIndex(item=>item.deduction.id === id);
            const item : EmployeeDeductionForEmployee = data[ndx];
            item.selected = $event.checked;
    
            this.deductions$ = of(data);
    
          }
    
        })
      }

}
