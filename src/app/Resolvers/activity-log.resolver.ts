/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { ResolveFn } from '@angular/router';
import { ActivityLogModel } from '../Models/ActivityLogModel';
import { inject, Injector } from '@angular/core';

import { ActivityLogHttpService } from '../Services/ActivityLogService/ActivityLogService';

export const activityLogResolver: ResolveFn<ActivityLogModel[]> = (route, state) => {

  const http = inject(ActivityLogHttpService)
  return http.getList();

//     const newInjector = Injector.create({
//     providers: [{ provide: SubsidiaryHttpServiceService<ActivityLogModel>, 
//       useClass: SubsidiaryHttpServiceService<ActivityLogModel> }],
//       parent: inject(Injector) // Inherit from the parent injector
//   });

//   const myServiceInstance = newInjector.get(ActivityLogHttpService);
 
//   // Use myServiceInstance to fetch data or perform actions
//   return myServiceInstance.getList(); // Example
 };
