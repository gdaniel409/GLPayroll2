/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';

import { EmployeeListComponent } from './Employees/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './Employees/employee-add-edit/employee-add-edit.component';

import { employeeResolver } from './Resolvers/employee.resolver';
import { PaymentListComponent } from './Payments/payment/payment-list.component';
import { paymentResolver } from './Resolvers/paymentresolver.resolver';
import { PaymentCreateComponent } from './Payments/payment-create/payment-create.component';
import { activityResolver } from './Resolvers/activity-resolver.resolver';

import { activityLogResolver } from './Resolvers/activity-log.resolver';
import { ActivityAddEditComponent } from './Activities/activity-add-edit/activity-add-edit.component';
import { ActivityLogCreateComponent } from './ActivityLogs/activity-log-create/activity-log-create.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { ActivityListComponent } from './Activities/activity-list/activity-list.component';
import { ActivityLogListComponent } from './ActivityLogs/activity-log-list/activity-log-list.component';
import { ActivitiesSelectComponent } from './Activities/activities-select/activities-select.component';
import { PaymentDetailsComponent } from './Payments/payment-details/payment-details.component';
import { ActivitiesDetailsComponent } from './Activities/activities-details/activities-details.component';
import { EmployeeDetailComponent } from './Employees/eployee-detail/employee-detail.component';
import { DeductionListComponent } from './Deductions/deduction-list/deductionList.component';
import { deductionsResolver } from './Resolvers/deductions.resolver';
import { DeductionAddEditComponent } from './Deductions/deduction-add-edit/deduction-add-edit.component';
import { DeparmensListComponent } from './Departments/deparmens-list/deparmens-list.component';
import { departmentResolver } from './Resolvers/department-resolver.resolver';
import { DepartmentsAddEditComponent } from './Departments/departments-add-edit/departments-add-edit.component';
import { positionResolver } from './Resolvers/position.resolver';
import { PositionAddEditComponent } from './Positions/positions-add-edit/position-add-edit/position-add-edit.component';
import { PositionListComponent } from './Positions/positions-list/positon-list/positon-list.component';
import { PositionsSelectComponent } from './Positions/positions-select/positions-select.component';
import { DeductionsSelectComponent } from './Deductions/deductions-select/deductions-select.component';
import { DepartmentSelectComponent } from './Departments/departments-select/department-select.component';
import { DeductionDetailComponent } from './Deductions/deduction-detail/deduction-detail.component';
import { DepartmentDetailComponent } from './Departments/department-detail/department-detail.component';
import { PositionDetailComponent } from './Positions/position-detail/position-detail.component';

export const routes: Routes = [
    
    {
      path: 'home',
      title: 'Home',
      component: HomeComponent
    },
    {
      path: 'notimplemented',
      title: 'Not Implemented',
      component: NotImplementedComponent
    },
    {
      path: 'listemployees',
      title: 'Employees List',
      component: EmployeeListComponent,
      
      resolve: {
        employees: employeeResolver
      }

    },
    {
      path: 'employee-add-edit',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent,
 
    },
    {
      path: 'employee-add-edit/:id',
      title: 'Employee Add/Edit',
      component: EmployeeAddEditComponent

    },
    {
      path: 'employeedetail/:id',
      title: 'Employee Detail',
      component: EmployeeDetailComponent

    },
    {
      path: 'listdeductions',
      title: 'Deductions List',
      component: DeductionListComponent,
      resolve:
      {
        deductions: deductionsResolver
      },
    },
    {
      path: 'deduction-add-edit',
      title: "Deduction Add/Edit",
      component: DeductionAddEditComponent,
    },
    {
      path: 'deduction-add-edit/:id',
      title: "Deduction Add/Edit",
      component: DeductionAddEditComponent,
    },
    {

      path: 'deductionselect/:id/:number',
      title: 'Deduction Select',
      component: DeductionsSelectComponent,
    },
    {
      path: 'deductiondetail/:id',
      title: 'Deduction Detail',
      component: DeductionDetailComponent,
    },
    {
      path: 'listpayments',
      title: 'Payments List',
      component: PaymentListComponent,
      resolve: 
      {
        payments: paymentResolver

      },

    },
    {
      path: 'createpayment',
      title: 'Create Payment',
      component: PaymentCreateComponent,
      

    },
    {
      path: 'createpayment/:id/:number',
      title: 'Create Payment',
      component: PaymentCreateComponent,
      

    },
    {
      path: 'paymentdetail/:id',
      title: 'Payment Details',
      component: PaymentDetailsComponent,
    },
    {
      path: 'listactivitylogs',
      title: 'List Activity Logs',
      component: ActivityLogListComponent,
      resolve: 
      {
        activitylogs: activityLogResolver

      },
 
    },
    {
      path: 'createactivitylog',
      title: 'Create Activity Log',
      component: ActivityLogCreateComponent,
      
 
    },
     {
      path: 'activitydetail/:id',
      title: 'Activity Details',
      component: ActivitiesDetailsComponent,
    },
    {
      path: 'createactivitylog/:employeeid/:employeenumber/:activityid/:activitynumber',
      title: 'Create Activity Log',
      component: ActivityLogCreateComponent,
      
 
    },

    {
      path: 'listactivities',
      title: 'List Activities',
      component: ActivityListComponent,
      resolve: 
      {
        activities: activityResolver

      },
 
    },

    {

      path: 'activityaddedit',
      title: 'Activities Add/Edit',
      component: ActivityAddEditComponent,

    },

    {

      path: 'activityaddedit/:id',
      title: 'Activities Add/Edit',
      component: ActivityAddEditComponent,

    },
    {
      path: 'selectactivity/:employeeid/:employeenumber',
      title: 'List Activities Select',
      component: ActivitiesSelectComponent,
      resolve: 
      {
        activities: activityResolver

      },
 
    },
    { path: 'listdepartments',
      title: 'List Departments',
      component: DeparmensListComponent,
      resolve:
      {
        departments: departmentResolver
      }

    },
    {

      path: 'departmentedit/:id',
      title: 'Department Edit',
      component: DepartmentsAddEditComponent,

    },
    {
      path: 'departmentdetail/:id',
      title: 'Department Detail',
      component: DepartmentDetailComponent,
    },
    {

      path: 'departmentadd',
      title: 'Department Add',
      component: DepartmentsAddEditComponent,

    },
    {

      path: 'departmentselect/:id/:number',
      title: 'Department Select',
      component: DepartmentSelectComponent,

    },
    { path: 'listpositions',
      title: 'List Positions',
      component: PositionListComponent,
      resolve:
      {
        positions: positionResolver
      }

    },
    {

      path: 'positionedit/:id',
      title: 'Position Edit',
      component: PositionAddEditComponent,

    },
    {

      path: 'positionadd',
      title: 'Position Add',
      component: PositionAddEditComponent,

    },
    {

      path: 'positionselect/:id/:number',
      title: 'Position Select',
      component: PositionsSelectComponent,

    },
    {
      path: 'positiondetail/:id',
      title: 'Position Detail',
      component: PositionDetailComponent,
    },
    
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home' }

  ];