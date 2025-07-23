/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { IID } from "../Interfaces/IID";
import { EmployeeModel } from "./EmployeeModel";

export interface EmployeePaymentModel extends IID{

    amount : number;
    
    employee : EmployeeModel;
    
    datePaid : Date;
    startPeriod : Date;
    endPeriod : Date;
  
    note : string;
    checkNumber : string;
  
}