/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/

import { IID } from "../Interfaces/IID";

export interface DeductionTypeModel extends IID{

    description : string | undefined;
    active : boolean | undefined;
     
}