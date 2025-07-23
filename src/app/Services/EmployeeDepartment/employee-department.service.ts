/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { AncillaryHttpService } from '../AncilliaryService/ancilliray.service';
import { EmployeeDepartmentForEmployee } from '../../Models/EmployeeDepartmentForEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDepartmentService 
  extends AncillaryHttpService<EmployeeDepartmentForEmployee>{
  public override apiString: string;
  override downloaded: boolean = false;

  constructor() { 
    super();
    this.apiString = "getdepartmentsforemployee";
  }

}
