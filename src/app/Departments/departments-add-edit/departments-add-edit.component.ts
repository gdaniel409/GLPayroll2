/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentHttpService } from '../../Services/Departments/department-http-service.service';
import { DepartmentModel } from '../../Models/DepartmentModel';
import { MatError, MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/select';
import { ActiveSelectComponent } from "../../Controls/DropdownControls/active-select/active-select.component";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-departments-add-edit',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    MatInputModule,
    MatButton,
    MatCheckboxModule,
   
],
  templateUrl: './departments-add-edit.component.html',
  styleUrl: './departments-add-edit.component.css'
})
export class DepartmentsAddEditComponent implements OnInit{

  departmentForm!: FormGroup;
  departmentID: number | undefined;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  activeValue : boolean | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpDepartmentService: DepartmentHttpService,
   

  ) 
  { }

  ngOnInit(): void {

    this.departmentID = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.departmentID;

    this.departmentForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        active: [true]
      
    })

    if (!this.isAddMode) {
        this.httpDepartmentService.getItem(this.departmentID)!.subscribe({

          next: (value)=>{
              this.departmentForm.patchValue(value!)
              this.activeValue = value.active;
            }

        })
    }
  }

  onSubmit(){

    if(this.departmentForm===undefined || this.departmentForm.invalid){
      return;
    }
    this.submitted = true;
    this.loading = true;
    
    if (this.isAddMode) {
        this.createActivity();
    } else {
        this.updateActivity();
    }

  }

  createActivity() {
  
    const departmentModel : DepartmentModel={
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description,
      active: this.activeValue ?? true,
      id: -1,
     
    }
  
    this.httpDepartmentService.addItem(departmentModel).subscribe({
      next: (value)=>{

        this.departmentForm.reset();
        this.loading = false;
        this.submitted = false;
        this.activeValue = true;

      }
    });

  }

  updateActivity() {

    const departmentModel : DepartmentModel={
      name: this.departmentForm.value.name,
      description: this.departmentForm.value.description,
      active: this.activeValue ?? true,
      id: this.departmentID,
 
    }

    this.httpDepartmentService.updateItem(departmentModel).subscribe({
      next: (value)=>{
      
        this.departmentForm.reset();
        this.loading = false;
        this.submitted = false;
        this.activeValue = true;
       
      } 
    });

  }

  //handleActiveChangeSelection
  handleActiveChangeSelection($event: any) {
    this.activeValue = $event.checked;
  }
  
}
