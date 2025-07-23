/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { MatError, MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { PositionsHttpService } from '../../../Services/Positions/positions.service';
import { PositionModel } from '../../../Models/PositionModel';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-position-add-edit',
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
  templateUrl: './position-add-edit.component.html',
  styleUrl: './position-add-edit.component.css'
})
export class PositionAddEditComponent implements OnInit{

  positionForm!: FormGroup;
  positionID: number | undefined;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  activeValue: boolean | undefined;
  
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http: PositionsHttpService,
     
  
    ) 
    { }
  
  ngOnInit(): void {

    this.positionID = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.positionID;

    this.positionForm = this.formBuilder.group({

      name: ['', Validators.required],
      description: ['', Validators.required],
      active: [true, Validators.required]
  
    });

    if (!this.isAddMode) {
        this.http.getItem(this.positionID)!.subscribe({

          next: (value)=>{
              this.positionForm.patchValue(value!)
              this.activeValue = value.active;
            
            }

        })
    }
   
  }

  onSubmit(){

    if(this.positionForm===undefined || this.positionForm.invalid){
      return;
    }
    this.submitted = true;
    this.loading = true;
    
    if (this.isAddMode) {
        this.createPosition();
    } else {
        this.updatePosition();
    }


  }

  createPosition() {

    const positionModel : PositionModel = {
      name: this.positionForm.value.name,
      description: this.positionForm.value.description,
      active: this.activeValue ?? true,
    
      id: -1,
    }

    this.http.addItem(positionModel).subscribe({
      next: (value)=>{
      
        this.positionForm.reset();
        this.loading = false;
        this.submitted = false;
        this.activeValue = false;
       
      } 
    });

  }

   updatePosition() {

     const positionModel : PositionModel = {
      name: this.positionForm.value.name,
      description: this.positionForm.value.description,
      id: this.positionID,
      active: this.activeValue ?? true,
      
    }

   
    this.http.updateItem(positionModel).subscribe({
      next: (value)=>{
      
        this.positionForm.reset();
        this.loading = false;
        this.submitted = false;
        this.activeValue = false;
       
      } 
    });

   }

 handleActiveChangeSelection($event: any) {
    this.activeValue = $event.checked;
  }

}
