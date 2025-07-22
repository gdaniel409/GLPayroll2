/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { AcctTrxnModel } from "./AcctTrxnModel";

export class TrxnModel
{
    organizationID : number = 0;
    accountTrxns: AcctTrxnModel[] | undefined;
    period: number | undefined;
    year : number | undefined;
    accountingPeriodType: number | undefined;
    note : string | undefined;
    autoPost : boolean = false;
    sessionKey : string | undefined;
}