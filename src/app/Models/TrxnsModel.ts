/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { AcctTrxnModel } from "./AcctTrxnModel";

export class TrxnBatchModel{

    organizationID : number = 0;
    accountTrxns: AcctTrxnModel[][] | undefined;
    period: number | undefined;
    year : number | undefined;
    accountingPeriodType: number | undefined;
    notes : string[] | undefined;
    autoPost : boolean = false;
    sessionKey : string | undefined;
}
