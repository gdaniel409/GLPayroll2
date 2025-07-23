/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { ResolveFn } from '@angular/router';
import { PositionsHttpService } from '../Services/Positions/positions.service';
import { inject } from '@angular/core';
import { PositionModel } from '../Models/PositionModel';

export const positionResolver: ResolveFn<PositionModel[]> = (route, state) => {
  const http = inject(PositionsHttpService)
  return http.getList();
};
