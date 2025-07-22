import { ResolveFn } from '@angular/router';
import { inject, Injector } from '@angular/core';
import { DeductionModel } from '../Models/DeductionModel';
import { DeductionHttpService } from '../Services/Deductions/deduction-http.service';

export const deductionsResolver: ResolveFn<DeductionModel[]> = (route, state) => {

  const http = inject(DeductionHttpService);
   return http.getList();

  // const newInjector = Injector.create({
  //   providers: [{ provide: SubsidiaryHttpServiceService<DeductionModel>, 
  //     useClass: SubsidiaryHttpServiceService<DeductionModel> }],
  //     parent: inject(Injector) // Inherit from the parent injector
  // });

  // const myServiceInstance = newInjector.get(SubsidiaryHttpServiceService<DeductionModel>);

  // let myApi : string = myServiceInstance.apiString;
  // myServiceInstance.apiString = "deductionmodel";
  // myApi = myServiceInstance.apiString;
  // console.log(myServiceInstance.apiString);
  // // Use myServiceInstance to fetch data or perform actions
  // return myServiceInstance.getList(); // Example

}
