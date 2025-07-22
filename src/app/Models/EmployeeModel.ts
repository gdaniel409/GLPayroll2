/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { RateTypeModel } from "./RateTypeModel";
import { EmployeeStatusModel} from "./EmployeeStatusModel";
import { IID } from "../Interfaces/IID";


export interface EmployeeModel extends IID{

    companyID : number;
   
    employeeNumber : string;
    title : string;
    firstName : string;
    lastName : string;
    middleName : string;
    rate: number;
    dateHired: Date;
    dateTerminated : Date | undefined;
    ssn : string;
  
    telephoneLandline : string;
    telephoneCell : string;
    email : string | undefined;
    employeeStatus : EmployeeStatusModel;
    rateType : RateTypeModel;

    // statusID: number | undefined;
    // rateTypeID: number | undefined;
   
}



