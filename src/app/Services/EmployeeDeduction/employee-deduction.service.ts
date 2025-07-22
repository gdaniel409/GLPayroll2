import { Injectable } from '@angular/core';
import { AncillaryHttpService } from '../AncilliaryService/ancilliray.service';
import { EmployeeDeductionModel } from '../../Models/EmployeeDeductionModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDeductionService<model> 
  extends AncillaryHttpService<model>{

  public override apiString: string;
  override downloaded: boolean = false;

  constructor() {
    super();
    this.apiString= "getdeductionsforemployee";
   }
}
