/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { IID } from "../Interfaces/IID";
import { DeductionModel } from "./DeductionModel";
import { EmployeeModel } from "./EmployeeModel";

export interface EmployeeDeductionModel extends IID{

    employee : EmployeeModel;
    deduction : DeductionModel;
    active : boolean;
}