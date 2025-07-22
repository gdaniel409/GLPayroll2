import { IID } from "../Interfaces/IID";

/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
export interface AddressModel extends IID{
   
    street1 : string | undefined;
    street2 : string | undefined;
    city : string | undefined;
    state : string | undefined;
    zip : string | undefined;
    countryCode : string | undefined;
}