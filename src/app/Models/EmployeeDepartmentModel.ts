/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { IID } from "../Interfaces/IID";
import { DepartmentModel } from "./DepartmentModel";
import { EmployeeModel } from "./EmployeeModel";

export interface EmployeeDepartmentModel extends IID{
  
    department : DepartmentModel;
    employee : EmployeeModel;
    active : boolean;
    startDate : Date;
   
}