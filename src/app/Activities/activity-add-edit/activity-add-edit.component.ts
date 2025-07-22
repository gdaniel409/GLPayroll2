import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivitiesModel } from '../../Models/ActivitiesModel';
import { MatError, MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { ActivitiesHttpService } from '../../Services/Activities/activites.service';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'app-activity-add-edit',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    MatInputModule,
    MatButton,
    MatCheckbox,
  ],
  
  templateUrl: './activity-add-edit.component.html',
  styleUrl: './activity-add-edit.component.css'
})
export class ActivityAddEditComponent implements OnInit {
 

  activityForm!: FormGroup;
  activityID: number | undefined;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  activeStatus : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpActivityService: ActivitiesHttpService,
   
   
  ) 
  { }

  ngOnInit(): void {

    this.activityID = Number(this.route.snapshot.params['id']);
    this.isAddMode = !this.activityID;
    this.activeStatus = true;

    this.activityForm = this.formBuilder.group({

      description: [''],
      activityNumber: [''],
      active: [true],

    });

  
    if (!this.isAddMode) {
        this.httpActivityService.getItem(this.activityID)!.subscribe({

          next: (value)=>{
              this.activityForm.patchValue(value!)
              this.activeStatus = value.active;

            }

        })
    }
  }
  
onSubmit(){

    if(this.activityForm===undefined || this.activityForm.invalid){
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

    const activityModel : ActivitiesModel ={
      id: undefined,
      description: this.activityForm.value.description,
      activityNumber: this.activityForm.value.activityNumber,
      active : this.activeStatus ?? true,
     
    }

     this.httpActivityService.addItem(activityModel).subscribe({
      next: (value)=>{
      
        this.activityForm.reset();
        this.loading = false;
        this.submitted = false;
       
      } 
    });
    
  }
  updateActivity() {

    const activityModel : ActivitiesModel ={
      id: this.activityID,
      description: this.activityForm.value.description,
      activityNumber: this.activityForm.value.activityNumber,
      active: this.activeStatus ?? true,
      
    }

    this.httpActivityService.updateItem(activityModel).subscribe({
      next: (value)=>{
      
        this.activityForm.reset();
        this.loading = false;
        this.submitted = false;
       
      } 
    });
    
  }

   handleActiveChangeSelection($event: any) {
      this.activeStatus = $event.checked;
  }

  
}
