import { Injectable } from "@angular/core";
import { SubsidiaryHttpService } from "../SubPayroll/subsidiary-http-service.service";
import { ActivityLogModel } from "../../Models/ActivityLogModel";


@Injectable({
  providedIn: 'root'
})
export class ActivityLogHttpService extends SubsidiaryHttpService<ActivityLogModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor() {
    super();

     this.apiString = "activitylogmodel";

   }
}