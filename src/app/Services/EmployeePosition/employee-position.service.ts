/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { AncillaryHttpService } from '../AncilliaryService/ancilliray.service';
import { EmployeePositionForEmployee } from '../../Models/EmployeePositionForEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService 
  extends AncillaryHttpService<EmployeePositionForEmployee>{
  public override apiString: string;
  
  constructor() { 
    super();
    this.apiString = "getpositionsforemployee";
  }
}
