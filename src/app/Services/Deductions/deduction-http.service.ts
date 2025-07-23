/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';
import { DeductionModel } from "../../Models/DeductionModel";
import { map, Observable } from 'rxjs';
import { DeductionTypeFactoryService } from '../../Factories/deduction-type-factory.service';
import { PayMetricFactoryService } from '../../Factories/pay-metric-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DeductionHttpService extends SubsidiaryHttpService<DeductionModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor(
    private deductionTypeFactory : DeductionTypeFactoryService,
    private payMetricFactory : PayMetricFactoryService,
       
  ) { 
    super();
    this.apiString = "deductionmodel";
  }

   override getList(): Observable<DeductionModel[]>{
      return super.getList().pipe(
        map(data=>{

          //standardize the data by transforming
          data.forEach(item=>{
            item.deductionType = this.deductionTypeFactory.getDeductionType(item.deductionType.id!);
            item.deductionMetric = this.payMetricFactory.getPayMetricType(item.deductionMetric.id!);
          })
          return data;
          
        })
      );
   }

  // override addItem(newItem : DeductionModel) : Observable<DeductionModel>{

  //   return super.addItem(newItem);
  // }
}
