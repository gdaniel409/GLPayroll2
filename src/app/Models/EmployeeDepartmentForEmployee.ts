/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { DepartmentModel } from "./DepartmentModel";


export interface EmployeeDepartmentForEmployee{

    selected: boolean;
    department: DepartmentModel;
}