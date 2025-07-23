/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeductionModel } from '../../Models/DeductionModel';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatSelectChange } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DeductionHttpService } from '../../Services/Deductions/deduction-http.service';
import { DeductonPayTypesComponent } from "../../Controls/DropdownControls/deducton-types/deducton-types.component";
import { DeductionPayMetricsComponent } from "../../Controls/DropdownControls/deduction-pay-metrics/deduction-pay-metrics.component";
import { MatCheckbox } from '@angular/material/checkbox';
import { DeductionTypeFactoryService } from '../../Factories/deduction-type-factory.service';
import { PayMetricFactoryService } from '../../Factories/pay-metric-factory.service';

@Component({
  selector: 'app-deduction-add-edit',
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
    DeductonPayTypesComponent,
    DeductionPayMetricsComponent,
    MatCheckbox,
    
],
 
  templateUrl: './deduction-add-edit.component.html',
  styleUrl: './deduction-add-edit.component.css'
})
export class DeductionAddEditComponent implements OnInit{

  deductionForm!: FormGroup;
  deductionID: number | undefined;
  isAddMode : boolean = false;
  loading = false;
  submitted= false;
  
  showamount : boolean = false;
  showpercent : boolean = false;
  deductionTypeID : number = 1;
  payMetricTypeID : number = 1;
  activeStatus : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private deductionHttpService: DeductionHttpService,
    private deductionTypeFactory : DeductionTypeFactoryService,
    private payMetricFactory : PayMetricFactoryService,
   
  ) {}
  
  ngOnInit(): void {

    //inject api string
    this.deductionHttpService.apiString = "deductionmodel";
    this.deductionID = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.deductionID;

    this.deductionForm = this.formBuilder.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      amount: [''],
      percentage: [''],
      active: [true],
 
    });

    this.deductionForm.reset;

    if (!this.isAddMode) {
     this.deductionHttpService.getItem(this.deductionID)!.subscribe({
        next: (value)=>{
 
          this.deductionTypeID = Number(value.deductionType.id);
          this.payMetricTypeID = Number(value.deductionMetric.id);
          this.activeStatus = value.active;
    
          const id = value.deductionMetric!.id;

          this.showamount = false;
          this.showpercent = false;

          switch(id){

            case 1:
              this.showpercent = true;
              break;
            case 2:
              this.showamount= true;
              break;
            default:
              this.showamount = true;
              this.showpercent = true;

          }

          this.deductionForm.patchValue(value);
 
        }
        

      })
       
    }
    else{

      this.showamount = false;
      this.showpercent = true;
      this.activeStatus = true;
      this.payMetricTypeID = 1;
      this.deductionTypeID = 1;

    }
    
  }

   onDeductionTypeChanged(event: MatSelectChange){

    this.showamount = false;
    this.showpercent = false;

    switch (event.value){

      case '3':
        this.showamount = true;
        this.showpercent = true;
        break;

      case '1':
        this.showpercent = true;
        break;

      case '2':
        this.showamount = true;
        break;

    }

    this.deductionTypeID = event.value;

   }

   onSubmit(){

     //stop here if form is invalid
    if (this.deductionForm === undefined || this.deductionForm.invalid) {
        return;
    }

    this.submitted = true;
    this.loading = true;
    
    if (this.isAddMode) {
        this.createDeduction();
    } else {
        this.updateDeduction();
    }

   }

   createDeduction(){

      const deductionModel : DeductionModel ={
      name: this.deductionForm.value.name,
      description: this.deductionForm.value.description,

       id: -1,
       active: this.activeStatus,
       deductionType: this.deductionTypeFactory.getDeductionType(this.deductionTypeID),
       deductionMetric: this.payMetricFactory.getPayMetricType(this.payMetricTypeID),
       percentage: Number(this.deductionForm.value.percentage),
       amount: Number(this.deductionForm.value.amount),
       
     }
    
    this.deductionHttpService.addItem(deductionModel).subscribe({
          next: ()=>{
          
            this.deductionForm.reset();
            this.loading = false;
            this.submitted = false;
            this.activeStatus = true;
           
          } 
        });

   }

   updateDeduction(){

    const deductionModel : DeductionModel ={
      
       name: this.deductionForm.value.name,
       description: this.deductionForm.value.description,

       id: this.deductionID,
       active: this.activeStatus,
       deductionType: this.deductionTypeFactory.getDeductionType(this.deductionTypeID),
       deductionMetric: this.payMetricFactory.getPayMetricType(this.payMetricTypeID),
       percentage: this.deductionForm.value.percentage,
       amount: this.deductionForm.value.amount,
       
       
     }

     this.deductionHttpService.updateItem(deductionModel).subscribe({
      next: (value)=>{
      
        this.deductionForm.reset();
        this.loading = false;
        this.submitted = false;
        this.activeStatus = true;
       
      } 
    });
    
   }

 handleDeductionTypeChangeSelection($event: any) {
     this.deductionTypeID = Number($event);

   

    
  }

  handlePayMetricTypeChangeSelection($event: any) {
     this.payMetricTypeID = Number($event);

     console.log(this.payMetricTypeID);

      this.showamount = false;
    this.showpercent = false;

    switch (this.payMetricTypeID){

      case 3:
        this.showamount = true;
        this.showpercent = true;
        break;

      case 1:
        this.showpercent = true;
        break;

      case 2:
        this.showamount = true;
        break;

    }

  }

   handleActiveChangeSelection($event: any) {
      this.activeStatus = $event.checked;

      console.log(this.activeStatus);
  }

}
