/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { ResolveFn } from '@angular/router';
import { DepartmentHttpService } from '../Services/Departments/department-http-service.service';
import { inject } from '@angular/core';
import { DepartmentModel } from '../Models/DepartmentModel';

export const departmentResolver: ResolveFn<DepartmentModel[]> = (route, state) => {
  const http = inject(DepartmentHttpService);
   return http.getList();

};
