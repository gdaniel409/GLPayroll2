/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { IID } from "../Interfaces/IID";
import { EmployeeModel } from "./EmployeeModel";
import { PositionModel } from "./PositionModel";

export interface EmployeePositionModel extends IID{

    employee : EmployeeModel | undefined;
    posiiton : PositionModel | undefined;
    active : boolean | undefined;
    startDate : Date | undefined;
    endDate : Date | undefined;
}