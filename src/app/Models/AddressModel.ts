/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { IID } from "../Interfaces/IID";

export interface AddressModel extends IID{
   
    street1 : string | undefined;
    street2 : string | undefined;
    city : string | undefined;
    state : string | undefined;
    zip : string | undefined;
    countryCode : string | undefined;
}