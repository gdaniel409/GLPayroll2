import { ResolveFn } from '@angular/router';
import { ActivitiesModel } from '../Models/ActivitiesModel';

import { inject, Injector } from '@angular/core';
import { ActivitiesHttpService } from '../Services/Activities/activites.service';

                                
export const activityResolver: ResolveFn<ActivitiesModel[]> = (route, state) => {

  const http = inject(ActivitiesHttpService);
   return http.getList();

 //  const newInjector = Injector.create({
  //   providers: [{ provide: SubsidiaryHttpServiceService<ActivitiesModel>, 
  //     useClass: SubsidiaryHttpServiceService<ActivitiesModel> }],
  //     parent: inject(Injector) // Inherit from the parent injector
  // });

  // const myServiceInstance = newInjector.get(SubsidiaryHttpServiceService<ActivitiesModel>);
  // myServiceInstance.apiString = "activitiesmodel";
  // console.log(myServiceInstance.apiString);
  // // Use myServiceInstance to fetch data or perform actions
  // return myServiceInstance.getList(); // Example

};
