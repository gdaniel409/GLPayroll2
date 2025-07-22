import { Injectable } from '@angular/core';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';
import { ActivitiesModel } from '../../Models/ActivitiesModel';
import { SignalRService } from '../SignalR/signal-rservice.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesHttpService extends SubsidiaryHttpService<ActivitiesModel>{
  override apiString: string;
  override downloaded: boolean = false;

  constructor(public signalR : SignalRService) {

    super();

    this.apiString = "activitiesmodel";

  }
  

 

}
