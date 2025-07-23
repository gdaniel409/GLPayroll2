/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, inject, OnInit } from '@angular/core';
import { DeductionModel } from '../../Models/DeductionModel';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { DeductionHttpService } from '../../Services/Deductions/deduction-http.service';
 import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatTableModule,
    MatTable,
  ],
  
  templateUrl: './deductionList.component.html',
  styleUrl: './deductionList.component.css'
})
export class DeductionListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: DeductionHttpService,
   
  ) {}

 
  ngOnInit(): void {
    
    this.getDeductions();
  }
  
  @ViewChild(MatTable) matTable: MatTable<any> | undefined;
  
  deductions$ : Observable<DeductionModel[]> | undefined;
  columnNames = ['name','deductiontype', 'active', 'edit'];

  private getDeductions(){

     this.deductions$ = this.route.data.pipe(
            switchMap(data =>
             of(data['deductions'])

         
            )
          );

  }

   onDelete($event: any, id: number){

    $event.preventDefault();

    if(window.confirm('Are you sure you want to delete this item?')){
      this.http.deleteItem(id).subscribe({
        next: (data)=>{

          this.deductions$ = of(data);
          this.matTable!.renderRows();

        }
      });
    }

  }

   refreshDeductions($event?: Event){

    if($event != undefined){
      $event.preventDefault();
    }
    
    this.deductions$=this.http.refresh();

   
  }
}
