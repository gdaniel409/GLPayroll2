/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { IID } from "../Interfaces/IID";
import { DedutionMetricModel} from "./DeductionMetric";
import { DeductionTypeModel } from "./DeductionTypeModel";

export interface DeductionModel extends IID{

    name: string;
    description : string;
    deductionType : DeductionTypeModel;
    amount : number | undefined;
    percentage : number | undefined;
    deductionMetric : DedutionMetricModel;
    active : boolean;
}