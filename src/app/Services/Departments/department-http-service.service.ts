import { Injectable } from '@angular/core';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';
import { DepartmentModel } from '../../Models/DepartmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentHttpService  extends SubsidiaryHttpService<DepartmentModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor() { 

    super();
    this.apiString = "departmentmodel";
  }
}
