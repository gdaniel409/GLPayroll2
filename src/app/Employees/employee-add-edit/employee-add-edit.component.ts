/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,  ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';


import { EmployeePayrollHttpService } from '../../Services/EmployeePayroll/employee-payroll.service';
import { EmployeeModel } from '../../Models/EmployeeModel';
import { EmployeeStatusModel } from '../../Models/EmployeeStatusModel';
import { RateTypeModel } from '../../Models/RateTypeModel';



import { Location } from '@angular/common';
import { SubsidiaryHttpService } from '../../Services/SubPayroll/subsidiary-http-service.service';
import { EmployeeStatusesComponent } from "../../Controls/DropdownControls/employee-statuses/employee-statuses.component";
import { PayRateTypesComponent } from "../../Controls/DropdownControls/pay-rate-types/pay-rate-types.component";
//import { TestModel1, TestModelContainer1 } from '../../Models/TestModel1';

@Component({
  selector: 'app-employee-add-edit',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatOption,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelect,
    EmployeeStatusesComponent,
    PayRateTypesComponent
],
 
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.css'
})
export class EmployeeAddEditComponent implements OnInit {

  employeeFormGroup!: FormGroup;
  employeeID: number | undefined;
  statusID : number | undefined;
  rateTypeID : number | undefined;
  isAddMode: boolean = false;
  //test: number | undefined
  loading = false;
  submitted = false;
  
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpEmployeeService : EmployeePayrollHttpService,
  //  private http: HttpClient,
  
    public location: Location,
   
  ) 
  {}

  ngOnInit() {
    
  this.employeeID = Number(this.route.snapshot.params['id']);
   
  this.isAddMode = !this.employeeID;
    
    this.employeeFormGroup = this.formBuilder.group({
      //  id : ['', Validators.required],
        title: ['', Validators.required],
        employeeNumber: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        email: ['', [Validators.required, Validators.email]],
        dateHired: ['', Validators.required],
        dateTerminated: [''],
        ssn: ['', Validators.required],
        telephoneLandline: [''],
        telephoneCell: [''],
        employeeID: [-1], 
        rate : ['', Validators.required],
    
   
    
    });

   
    this.employeeFormGroup.reset();

    if (!this.isAddMode) {
     this.httpEmployeeService.getItem(this.employeeID)!.subscribe({
        next: (value)=>{

          this.employeeFormGroup.patchValue(value!);
        
          this.statusID = value.employeeStatus.id;
          this.rateTypeID = value.rateType.id;
        
        }
      })
       
    }
    else{
      this.statusID = 1;
    }
  }

  onSubmit() {
 
    //stop here if form is invalid
    if (this.employeeFormGroup === undefined || this.employeeFormGroup.invalid) {
        return;
    }

    this.submitted = true;
    this.loading = true;
    
    if (this.isAddMode) {
        this.createEmployee();
    } else {
        this.updateEmployee();
    }
  }

  private createEmployee() {

    const employeeModel : EmployeeModel ={
      companyID : 1,
      title: this.employeeFormGroup.value.title,
      employeeNumber: this.employeeFormGroup.value.employeeNumber,
      firstName: this.employeeFormGroup.value.firstName,
      lastName: this.employeeFormGroup.value.lastName,
      middleName: this.employeeFormGroup.value.middleName,

      dateHired: this.employeeFormGroup.value.dateHired,
      dateTerminated: this.employeeFormGroup.value.dateTerminated,
      ssn: this.employeeFormGroup.value.ssn,
      telephoneLandline: this.employeeFormGroup.value.telephoneLandline,
      telephoneCell: this.employeeFormGroup.value.telephoneCell,
      email: this.employeeFormGroup.value.email,
      rate: this.employeeFormGroup.value.rate,
      employeeStatus: {
        status: "n/a",
        id: this.statusID
      },
      rateType:
      {
        id: this.rateTypeID,
        description: "N/A"
      },
      id: -1,
    }

    this.httpEmployeeService.addItem(employeeModel).subscribe({
      next: ()=>{
      
        this.employeeFormGroup.reset();
        this.loading = false;
        this.submitted = false;
       
      } 
    });

  }

  private updateEmployee() {

    const employeeModel : EmployeeModel ={

      companyID : 1,
      title: this.employeeFormGroup.value.title,
      employeeNumber: this.employeeFormGroup.value.employeeNumber,
      firstName: this.employeeFormGroup.value.firstName,
      lastName: this.employeeFormGroup.value.lastName,
      middleName: this.employeeFormGroup.value.middleName,
      
      dateHired: this.employeeFormGroup.value.dateHired,
      dateTerminated: this.employeeFormGroup.value.dateTerminated,
      ssn: this.employeeFormGroup.value.ssn,
      telephoneLandline: this.employeeFormGroup.value.telephoneLandline,
      telephoneCell: this.employeeFormGroup.value.telephoneCell,
      email: this.employeeFormGroup.value.email,
      id: this.employeeID ?? -1,
      
      rate : this.employeeFormGroup.value.rate,
      employeeStatus: {
        status: "n/a",
        id: this.statusID
      },
      rateType:
      {
        id: this.rateTypeID,
        description: "N/A"
      },
    }

    this.httpEmployeeService.updateItem(employeeModel).subscribe({
      next: (value)=>{
      
        this.employeeFormGroup.reset();
        this.loading = false;
        this.submitted = false;
       
      } 
    });
 
  }

  handleStatusChangeSelection($event: any) {
    this.statusID = $event;
  }

  handleRateChangeSelection($event: any) {
    this.rateTypeID = $event;
  }


}
