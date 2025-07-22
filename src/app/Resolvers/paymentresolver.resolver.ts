/*
  This is a demo application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  The application is presently incomplete and demonstrats a few basic functions.
*/
import { ResolveFn } from '@angular/router';
import { EmployeePaymentModel } from '../Models/EmployeePaymentModel';
import { inject, Injector } from '@angular/core';
//import { SubsidiaryHttpServiceService } from '../Services/SubPayroll/subsidiary-http-service.service';
import { PaymentsHttpService } from '../Services/Payments/Paymebt.Service';

export const paymentResolver: ResolveFn<EmployeePaymentModel[]> = (route, state) => {

  const http = inject(PaymentsHttpService)
   return http.getList();

  // const newInjector = Injector.create({
  //   providers: [{ provide: SubsidiaryHttpServiceService<EmployeePaymentModel>, 
  //     useClass: SubsidiaryHttpServiceService<EmployeePaymentModel> }],
  //     parent: inject(Injector) // Inherit from the parent injector
  // });

  // const myServiceInstance = newInjector.get(SubsidiaryHttpServiceService<EmployeePaymentModel>);
  // myServiceInstance.apiString = "employeepaymentmodel";
  // console.log(myServiceInstance.apiString);
  // // Use myServiceInstance to fetch data or perform actions
  // return myServiceInstance.getList(); // Example

};
