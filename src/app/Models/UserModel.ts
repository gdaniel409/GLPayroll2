/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
export class UserModel{
  
    organizationID : number | undefined;
    username : string | undefined;
    password : string | undefined;
    applicationName : string | undefined;
    isAuthenticated : boolean | undefined;
    sessionKey : string | undefined;
    roles : string[] | undefined;
}