import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-deduction-status',
  imports: [
     MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    MatError,
  ],
  templateUrl: './deduction-status.component.html',
  styleUrl: './deduction-status.component.css'
})
export class DeductionStatusComponent {

  @Input() deductionStatusID: number | undefined; 
  @Output() selectionChange = new EventEmitter<any>(); // Event for selection changes

  onSelectionChange(event: any): void {
    this.selectionChange.emit(event.value);
  }

  constructor()
  {}

  compare(object1: any, object2: any) {
    return object1 && object2 && object1.toString() == object2.toString()
  }
  

}
