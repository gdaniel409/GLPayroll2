import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RowSelectorService {

  constructor() { }

  rowIndex : number = -1;
}
