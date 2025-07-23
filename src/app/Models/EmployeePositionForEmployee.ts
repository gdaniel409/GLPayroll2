/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { PositionModel } from "./PositionModel";

export interface EmployeePositionForEmployee {

    selected: boolean;
    position: PositionModel;

}