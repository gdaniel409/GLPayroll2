/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { SignalRService } from '../SignalR/signal-rservice.service';
import {catchError, map, Observable, of } from 'rxjs';
import { EmployeeModel} from '../../Models/EmployeeModel';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayrollHttpService extends SubsidiaryHttpService<EmployeeModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor(public signalR : SignalRService) {
    super();

    this.apiString = "employeemodel";

   }

   override getList() : Observable<EmployeeModel[]>{

    return super.getList().pipe(
       map(data => {
    
          data.forEach(item=>{

            item.ssn = item.ssn.substring(item.ssn.length - 4, item.ssn.length)

          });
             
          return data;
    
        }),
        catchError(this.handleError)
    )

   }

   override updateItem(editItem: EmployeeModel): Observable<EmployeeModel> {

        return  super.updateItem(editItem).pipe(map((data)=>{
              
            data.ssn = data.ssn.substring(data.ssn.length - 4, data.ssn.length)
            return data;
    
          }),
          catchError(this.handleError)
        );

   }

  override addItem(newItem: EmployeeModel): Observable<EmployeeModel> {


    return super.addItem(newItem).pipe(
      map(data => {
            
       data.ssn = data.ssn.substring(data.ssn.length - 4, data.ssn.length)
      return data;
      }),
      catchError(this.handleError)

    )

  }

  filterEmployeeList(filter: string): Observable<EmployeeModel[]> {

    if(filter === "*" || filter===""){
      return of(this.list);
    }
    
    //let empNumberList : EmployeeModel[] = this.employeesList.filter(value => value.employeeNumber?.toLowerCase()==filter.toLowerCase());

    let tokens : string[] = [];

    if(filter.includes(",")){
      tokens = filter.split(",");
    }else{
      tokens = filter.split(" ");
    }

    let newList : EmployeeModel[]= [];

    tokens.forEach((element, index)=>{

      let numberList : EmployeeModel[] = this.list.filter(value=>value.employeeNumber.toLowerCase() == element.toLowerCase());

      if(numberList.length > 0)
      {
        newList = newList.concat(numberList);
      }

      let firstNameList : EmployeeModel[] = this.list.filter(value=>value.firstName.toLowerCase() === element.toLowerCase());

      if(firstNameList.length > 0){
        newList = newList.concat(firstNameList);
      }

      let lastNameList : EmployeeModel[] = this.list.filter(value=>value.lastName.toLowerCase() === element.toLowerCase());

      if(lastNameList.length > 0)
      {
        newList = newList.concat(lastNameList);
      }

    });

    //newList.concat(empNumberList);

    return of(this.removeDuplicates(newList));
  }

  private removeDuplicates(list : EmployeeModel[]) : EmployeeModel[]{

    return [...new Set(list)];

  }

  getEmployeeFromNumber(employeeNumber : string) : EmployeeModel | undefined{

    if(this.downloaded){

      const employee  = this.list.find(item=>item.employeeNumber === employeeNumber);
      return employee;

    }
    else{
      return undefined;
    }

  }

}


