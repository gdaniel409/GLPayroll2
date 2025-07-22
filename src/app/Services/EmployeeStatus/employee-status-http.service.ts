import { Injectable } from '@angular/core';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';
import { EmployeeStatusModel } from '../../Models/EmployeeStatusModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusHttpService extends SubsidiaryHttpService<EmployeeStatusModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor() {

    super();
    this.apiString = "employeestatus";
    
  }

}
