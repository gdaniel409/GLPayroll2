import { Injectable } from '@angular/core';
import { DeductionTypeModel } from '../Models/DeductionTypeModel';

@Injectable({
  providedIn: 'root'
})
export class DeductionTypeFactoryService {

  constructor() { }

  getDeductionType(typeID : number) : DeductionTypeModel{

   let deductionType: DeductionTypeModel;

    switch(typeID){

      case 1:
        return deductionType= {

          description: "Benefit",
          active: true,
          id: typeID
           
        };

       case 2:
        return deductionType= {

          description: "Taxable Benefit",
          active: true,
          id: typeID
           
        };

       case 3:
        return deductionType= {

          description: "State Tx",
          active: true,
          id: typeID
           
        };

       case 4:
        return deductionType= {

          description: "Fed Tx",
          active: true,
          id: typeID
           
        };

       case 5:
        return deductionType= {

          description: "Local Tx",
          active: true,
          id: typeID
           
        };

       case 6:
        return deductionType= {

          description: "Deduction",
          active: true,
          id: typeID
           
        };

       case 7:
        return deductionType= {

          description: "Other",
          active: true,
          id: typeID
           
        };
       
      default:

      return deductionType= {

          description: "Unknown",
          active: true,
          id: typeID
           
        };

    }
    
  }


}
