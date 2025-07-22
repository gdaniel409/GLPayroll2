/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
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