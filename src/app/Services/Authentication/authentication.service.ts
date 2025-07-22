import {Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  token : string = "";
  key : string = "";
  authenticated : boolean = false;
  
  constructor() {}
   
}
