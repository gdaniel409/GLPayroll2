/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { PositionModel } from '../../Models/PositionModel';
import { PositionsHttpService } from '../../Services/Positions/positions.service';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-positon-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatTableModule,
    MatTable,
    
  ],
  templateUrl: './positon-list.component.html',
  styleUrl: './positon-list.component.css'
})
export class PositionListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: PositionsHttpService,
    
    ) {}
 
  ngOnInit(): void {
  
    this.getPositions();
    
  }

  positions$ : Observable<PositionModel[]> | undefined;
  columnNames = ['name','description','active', 'edit' ];

  @ViewChild(MatTable) matTable: MatTable<any> | undefined;
   
  private getPositions()
  {
    this.positions$ = this.route.data.pipe(
            switchMap(data =>
              of(data['positions']
    
              )) 
          );
  }

  onDelete($event: any, id: number){

    $event.preventDefault();

    if(window.confirm('Are you sure you want to delete this item?')){
      this.http.deleteItem(id).subscribe({
        next: (data)=>{

          this.positions$ = of(data);
          this.matTable!.renderRows();

        }
      });
    }

  }

  refreshPositions($event?: Event){

    if($event != undefined){
      $event.preventDefault();
    }
    
    this.positions$ = this.http.refresh();
    
  }
  
}
