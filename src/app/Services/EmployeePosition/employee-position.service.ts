import { Injectable } from '@angular/core';
import { AncillaryHttpService } from '../AncilliaryService/ancilliray.service';
import { EmployeePositionForEmployee } from '../../Models/EmployeePositionForEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService 
  extends AncillaryHttpService<EmployeePositionForEmployee>{
  public override apiString: string;
  override downloaded: boolean = false;

  constructor() { 
    super();
    this.apiString = "getpositionsforemployee";
  }
}
