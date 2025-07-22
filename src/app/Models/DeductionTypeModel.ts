/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/

import { IID } from "../Interfaces/IID";

export interface DeductionTypeModel extends IID{

    description : string | undefined;
    active : boolean | undefined;
     
}