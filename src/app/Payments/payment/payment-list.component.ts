/*
  This is a payroll application developed by Gordon Daniel demonstrating how a payroll
  application might work.  It is covered under the MIT license.
  

  
*/
import { Component, OnInit } from '@angular/core';
import { EmployeePaymentModel } from '../../Models/EmployeePaymentModel';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PaymentsHttpService } from '../../Services/Payments/Paymebt.Service';

@Component({
  selector: 'app-payment',
  imports: [AsyncPipe,
     MatTableModule,
     RouterLink,
     DatePipe,
  ],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent implements OnInit {

  payments$ : Observable<EmployeePaymentModel[]> | undefined;
  //columnNames = ['paymentid', 'amount', 'employeenumber', 'datepaid', 'startperiod','endperiod','note', '' ];
  columnNames = ['employeenumber','checknumber','amount','datepaid','details' ];

  constructor(private route: ActivatedRoute, private http: PaymentsHttpService,
    
  ) {}
 
  

  ngOnInit(): void {
    this.getPayments();
  }

  private getPayments() {
  
        this.payments$ = this.route.data.pipe(
          switchMap(data =>
            of(data['payments']
  
            )) 
        );
  
    }

    refreshPayments($event?: Event){

      if($event != undefined){
        $event.preventDefault();
      }
      
      this.payments$ =this.http.refresh();

  }

}
