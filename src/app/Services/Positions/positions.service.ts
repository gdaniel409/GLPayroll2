/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Injectable } from '@angular/core';
import { SubsidiaryHttpService } from '../SubPayroll/subsidiary-http-service.service';
import { PositionModel } from '../../Models/PositionModel';

@Injectable({
  providedIn: 'root'
})
export class PositionsHttpService extends SubsidiaryHttpService<PositionModel>{
  public override apiString: string;
  override downloaded: boolean = false;

  constructor() {
    super();

    this.apiString = "positionmodel";

   }
}
