import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../Models/DepartmentModel';
import { map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { DepartmentHttpService } from '../../Services/Departments/department-http-service.service';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-deparmens-list',
  imports: [
    AsyncPipe, RouterModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatTable,
  ],
  templateUrl: './deparmens-list.component.html',
  styleUrl: './deparmens-list.component.css'
})
export class DeparmensListComponent implements OnInit{

  constructor(private route: ActivatedRoute, private http: DepartmentHttpService,
    
  ){}
 
  ngOnInit(): void {
   
    this.getDepartments();
  }

  @ViewChild(MatTable) matTable: MatTable<any> | undefined;

  departments$ : Observable<DepartmentModel[]> | undefined;

  columnNames = ['name', 'description','active', 'edit' ];

  getDepartments(){

    this.departments$ = this.route.data.pipe(
                switchMap(data =>
                  of(data['departments']
        
                  )) 
              );


  }

 onDelete($event: any, id: number){

    $event.preventDefault();

    if(window.confirm('Are you sure you want to delete this item?')){
      this.http.deleteItem(id).subscribe({
        next: (data)=>{

          this.departments$ = of(data);
          this.matTable!.renderRows();

        }
      });
    }

  }

   refreshDepartments($event?: Event){

  //  this.getDepartments();

    if($event != null){
      $event.preventDefault();
    }
     
    this.departments$ = this.http.refresh();

    }

}

