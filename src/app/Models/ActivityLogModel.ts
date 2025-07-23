/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/

import { IID } from "../Interfaces/IID";

export interface ActivityLogModel extends IID{

    activityID : number | undefined;
    employeeID : number | undefined;
    activityNumber : string | undefined;
    employeeNumber : string | undefined;
    unitsOfWork: number | undefined;
    dateTimeBeginActivity: Date | undefined;
    dateTimeEndActivity: Date | undefined;

    resolved: boolean | undefined;
 
}