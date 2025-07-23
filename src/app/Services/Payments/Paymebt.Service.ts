/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from "@angular/core";
import { EmployeePaymentModel } from "../../Models/EmployeePaymentModel";
import { SubsidiaryHttpService } from "../SubPayroll/subsidiary-http-service.service";


@Injectable({
  providedIn: 'root'
})
export class PaymentsHttpService extends SubsidiaryHttpService<EmployeePaymentModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor() {
    super();

    this.apiString = "employeepaymentmodel";

   }
}
