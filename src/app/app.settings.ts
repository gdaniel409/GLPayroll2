
/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { InjectionToken } from '@angular/core';

export interface IAppSettings {
  title: string;
  version: string;
  hostGLApi: string;
  hostSubApi: string;
 
  //GL Control Accounts
  trxnEndPoint: string;
  trxnBatchEndPoint: string;
  postEndPoint: string;
  getLockCountEndPoint: string;
  authenticateUserEndPoint: string;

  //subsidiary GL 
  listdeductions: string;
  listemployees : string ;
  listPayments: string ;
  listActivities: string ;
  listActivityLogs: string ;
  listActivityLogsByEmployeeID: string ;
  listActivityLogsByEmployeeNumber: string;
  listDepartments: string;
  listPositions: string;

  createemployee : string ;
  createdepartment: string;
  createposition: string;
  createActivity: string ;
  createDeducton : string;
  createPayment : string;

  updateemployee : string ;
  updatedepartment: string;
  updateposition: string;
  updatededuction : string;
  updateActivity: string ;

  deleteDeduction: string;
  deleteDepartment: string;
  deletePosiiton: string;
  deleteActivity: string;
  
  employeeTest: string ;
  logActivityForEmployee: string ;

  deductionpaymetric: string;
  deductiontypes: string;
  employeestatuslist: string;
  payRateTypes : string;
  employeeStatuses : string;
  authenticate: string;

  getString(value : string) : string;
}

export const appSettings : IAppSettings={
  title: 'GL Payroll',
  version: '1.0',
  hostGLApi: 'https://localhost:7277/',
  hostSubApi: 'https://localhost:7283/',
  authenticate: "api/authentication/authenticate",
  //  hostSubApi: 'https://www.audiosl.com/GLSubsidiaryAPI/',
  trxnEndPoint: 'api/GLLedger/trxn',
  trxnBatchEndPoint: 'api/GLLedger/trxns',
  postEndPoint: 'GLLedger/post',
  getLockCountEndPoint: 'api/GLLedger/count',
  authenticateUserEndPoint: 'api/GLLedger/authenticateuser',

  ///////////////////////////////////////
  listActivities: 'api/activities/list',
  createActivity: 'api/activities/create',
  updateActivity: 'api/activities/edit',

  listActivityLogs: 'api/activityLog/list',
  listActivityLogsByEmployeeID: 'api/activityLog/listactivitylogforemployeebyemployeeid',
  listActivityLogsByEmployeeNumber: 'pi/activityLog/listbyemployeenumber',
  logActivityForEmployee: 'api/activityLog/logactivity',

  listdeductions: 'api/Deductions/list',
  listPayments: 'api/payment/list',
  createPayment: "api/payment/create",

  listemployees: 'api/Employees/list',
  createemployee: 'api/Employees/create',
  updateemployee: 'api/employees/edit',

  employeeTest: 'api/employees/testmethod',
  employeeStatuses: 'api/employees/employeestatus',

  listDepartments: 'api/departments/list',
  listPositions: 'api/positions/list',

  deductionpaymetric: 'api/deductions/deductionpaymetrics',
  deductiontypes: 'api/deductions/deductiontypes',
  employeestatuslist: 'api/employees/employeestatus',
  payRateTypes: 'api/payment/payratetypes',

  updatededuction: 'api/deductions/edit',
  createDeducton: "api/deductions/create",

  createdepartment: 'api/departments/create',
  updatedepartment: 'api/departments/edit',
  createposition: 'api/positions/create',
  updateposition: 'api/positions/edit',

  deleteDepartment: 'api/departments/delete',
  deletePosiiton: 'api/positions/delete',
  deleteDeduction: "api/deductions/delete",
  deleteActivity: "api/activities/delete",

  getString: function (value: string): string {

    switch (value.toLowerCase()) {

      case "authenticate":
        return this.hostSubApi + this.authenticate;

      case "departmentmodeldelete":
        return this.hostSubApi + this.deleteDepartment;

      case "positionmodeldelete":
        return this.hostSubApi + this.deletePosiiton;

      case "deductionmodeldelete":
        return this.hostSubApi + this.deleteDeduction;

      case "":
        return this.hostSubApi + this.deleteActivity;

      case "employeemodellist":
        return this.hostSubApi + this.listemployees;

      case "activitiesmodellist":
        return this.hostSubApi + this.listActivities;

      case "activitylogmodellist":
        return this.hostSubApi + this.listActivityLogs;

      case "employeepaymentmodellist":
        return this.hostSubApi + this.listPayments;


      case "deductionmodellist":
        return this.hostSubApi + this.listdeductions;

      case "departmentmodellist":
        return this.hostSubApi + this.listDepartments;


      //add item///////////////////////////
      case "employeemodeladditem":
        return this.hostSubApi + this.createemployee;

      case "activitiesmodeladditem":
        return this.hostSubApi + this.createActivity;

      case "activitylogmodeladditem":
        return this.hostSubApi + this.logActivityForEmployee;

      case "employeepaymentmodeladditem":
        return this.hostSubApi + this.createPayment;

      case "deductionmodeladditem":
        return this.hostSubApi + this.createDeducton;

      case "departmentmodeladditem":
        return this.hostSubApi + this.createdepartment;

      case "positionmodeladditem":
        return this.hostSubApi + this.createposition;


      //update item//////////////////////////////////
      case "employeemodelupdateitem":
        return this.hostSubApi + this.updateemployee;

      case "activitiesmodelupdateitem":
        return this.hostSubApi + this.updateActivity;

      case "activitylogmodelupdateitem":
        throw new Error("Not implemented.");

      case "employeepaymentmodelupdateitem":
        throw new Error("Not implemented.");

      case "deductionmodelupdateitem":
        return this.hostSubApi + this.updatededuction;

      case "departmentmodelupdateitem":
        return this.hostSubApi + this.updatedepartment;

      case "positionmodelupdateitem":
        return this.hostSubApi + this.updateposition;

      case "deductionpaymetriclist":
        return this.hostSubApi + this.deductionpaymetric;

      case "deductiontypeslist":
        return this.hostSubApi + this.deductiontypes;

      case "employeestatuslist":
        return this.hostSubApi + this.employeestatuslist;

      case "payratetypeslist":
        return this.hostSubApi + this.payRateTypes;

      case "employeestatuseslist":
        return this.hostSubApi + this.employeeStatuses;

      case "positionmodellist":
        return this.hostSubApi + this.listPositions;

      //ancillary services
      case "getdepartmentsforemployeegetancillary":
        return this.hostSubApi + "api/departments/getdepartmentsforemployee";

      case "getdepartmentsforemployeecreateancillary":
        return this.hostSubApi + "api/departments/createdepartmentsforemployee";

      case "getpositionsforemployeegetancillary":
        return this.hostSubApi + "api/positions/getpositionsforemployee";

      case "getpositionsforemployeecreateancillary":
        return this.hostSubApi + "api/positions/createpositionsforemployee";

      case "getdeductionsforemployeegetancillary":
        return this.hostSubApi + "api/deductions/getdeductionsforemployee";

      case "getdeductionsforemployeecreateancillary":
        return this.hostSubApi + "api/deductions/CreateDeductionsForEmployee";

      default:
        return "";


    }
  },

  
}


export const APP_SETTINGS = new InjectionToken<IAppSettings>('app.settings');