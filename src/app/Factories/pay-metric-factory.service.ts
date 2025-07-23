/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { DedutionMetricModel } from '../Models/DeductionMetric';

@Injectable({
  providedIn: 'root'
})
export class PayMetricFactoryService {

  constructor() { }

  getPayMetricType(pmType: number) : DedutionMetricModel{

    let dMetric : DedutionMetricModel;

    switch(pmType){

      case 1:
        return dMetric= {

          description : "Percentage",
          id : pmType
           
        };

        case 2:
        return dMetric= {

          description : "Fixed",
          id : pmType
           
        };

      case 3:
        return dMetric= {

          description : "Both",
          id : pmType
           
        };


      default:

      return dMetric= {

          description : "unknown",
          id : pmType
           
        };

    }
 
  }
}
