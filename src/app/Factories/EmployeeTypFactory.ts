import id from "@angular/common/locales/id";
import { EmployeeStatusModel } from "../Models/EmployeeStatusModel";
import { RateTypeModel } from "../Models/RateTypeModel";

export class EmployeeTypeFactory{


    getEmployeeStatus(statusID : number) : EmployeeStatusModel{
        
        let employeeStatus : EmployeeStatusModel;

        switch(statusID){

            case 1:
                return employeeStatus= {
                    status: "Active",
                    id: 1
                };

            case 2:
                return employeeStatus= {
                    status: "Inactive",
                    id: 2
                };

            case 3:
                return employeeStatus= {
                    status: "Terminated",
                    id: 3
                };



            default:

                return employeeStatus= {
                    status: "Active",
                    id: 1
                };

        }
    }

    getRateType(rateTypeID : number) : RateTypeModel{

        let rateTypeModel : RateTypeModel;

        switch(rateTypeID){

            case 1:
                return rateTypeModel = {
                     id: 1,
                     description: "Hourly"
                };

            case 2:
                return rateTypeModel = {
                     id: 2,
                     description: "Hourly"
                };

            default:
                return rateTypeModel = {
                     id: 1,
                     description: "Hourly"
                };

        }
        
    }
}