/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { NavBarComponent} from './Navigation/NavBar/nav-bar/nav-bar.component';
import { APP_SETTINGS } from './app.settings';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { AuthenticationModel } from './Models/AuthenticationModel';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  //providers: [HttpService]
})
export class AppComponent implements OnInit {
  
  title = 'GLPayroll';

  private http = inject(HttpClient);
  private appSettings = inject(APP_SETTINGS);

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {

     if(this.auth.authenticated){
      return;
    }
    
    const url : string = this.appSettings.getString("authenticate");
    this.http.get<AuthenticationModel>(url).subscribe({
      next: model=>{
        this.auth.key = model.key;
        this.auth.token = model.token;
        this.auth.authenticated = true;
      }
    });
    
  }

}
