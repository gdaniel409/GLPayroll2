/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatError, MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import { EmployeePaymentModel } from '../../Models/EmployeePaymentModel';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeePayrollHttpService } from '../../Services/EmployeePayroll/employee-payroll.service';
import { EmployeeModel } from '../../Models/EmployeeModel';
import { Observable } from 'rxjs';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { PaymentsHttpService } from '../../Services/Payments/Paymebt.Service';


@Component({
  selector: 'app-payment-create',
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatCheckbox,
 
  ],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.css'
})
export class PaymentCreateComponent implements OnInit{

  paymentForm!: FormGroup;
  
  submitted = false;
  loading = false;

  employeeID: number | undefined;
  employeeNumber: string | undefined;
  employee$: Observable<EmployeeModel | undefined> | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
     private httpPaymentService : PaymentsHttpService,
    private route: ActivatedRoute,
    private httpEmployeeService : EmployeePayrollHttpService,
   
   
  ) 
  { }

  ngOnInit(): void {

    this.employeeID = Number(this.route.snapshot.params['id']) ?? -1;
    this.employeeNumber = this.route.snapshot.params['number'] ?? '';
    
    this.paymentForm = this.formBuilder.group({
        
        employeeNumber: [String(this.employeeNumber), Validators.required],
        amount: ['', Validators.required],
        payType: [''],
        startPeriod: [''],
        endPeriod: [''],
      
        note: [''],
        checkNumber: [''],
        linktolog: [false],
       
        
      });

     

    //  this.paymentForm.setValue({ employeeNumber: String(this.employeeNumber )});
 
  }

  onSubmit() {

    if (this.paymentForm === undefined || this.paymentForm.invalid) {
        return;
    }

    this.submitted = true;
    this.loading = true;

    const enumber : string = this.paymentForm.value.employeeNumber;

   let empl = this.httpEmployeeService.getEmployeeFromNumber(enumber);

   if(empl === undefined){

    alert("Employee not found.");
    return;
   }

   let linkToLog : boolean = this.paymentForm.value.linktolog;

    const paymentModel : EmployeePaymentModel ={
      id: undefined,
      amount: this.paymentForm.value.amount,
      employee: empl,
      datePaid: new Date(),
      startPeriod: this.paymentForm.value.startPeriod,
      endPeriod: this.paymentForm.value.endPeriod,
      note: this.paymentForm.value.note,
      checkNumber: this.paymentForm.value.checkNumber,
      
    }

    this.httpPaymentService.addItem(paymentModel).subscribe({
      next: () =>{
        this.paymentForm.reset();
        this.loading = false;
        this.submitted = false;
      }
    });

  }

}


