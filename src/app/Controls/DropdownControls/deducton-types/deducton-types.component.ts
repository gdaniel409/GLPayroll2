import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-deducton-types',
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    MatError,
  ],
  templateUrl: './deducton-types.component.html',
  styleUrl: './deducton-types.component.css'
})
export class DeductonPayTypesComponent {

  @Input() deductionTypeID: number | undefined; 
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
