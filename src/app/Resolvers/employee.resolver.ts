/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { ResolveFn } from '@angular/router';
import { EmployeeModel } from '../Models/EmployeeModel';

import { inject, Injector } from '@angular/core';
import { SubsidiaryHttpService } from '../Services/SubPayroll/subsidiary-http-service.service';
import { EmployeePayrollHttpService } from '../Services/EmployeePayroll/employee-payroll.service';

export const employeeResolver: ResolveFn<EmployeeModel[]> = (route, state) => {

  const http = inject(EmployeePayrollHttpService)
  return http.getList();

  // const newInjector = Injector.create({
  //   providers: [{ provide: SubsidiaryHttpServiceService<EmployeeModel>, 
  //     useClass: SubsidiaryHttpServiceService<EmployeeModel> }],
  //     parent: inject(Injector) // Inherit from the parent injector
  // });

  // const myServiceInstance = newInjector.get(EmployeePayrollHttpService);
  // return myServiceInstance.getList(); 

};
