import { Component} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';

import { EmployeePaymentModel } from '../../Models/EmployeePaymentModel';
import { Observable, of } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SubsidiaryHttpService } from '../../Services/SubPayroll/subsidiary-http-service.service';
import { PaymentsHttpService } from '../../Services/Payments/Paymebt.Service';

@Component({
  selector: 'app-payment-details',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
    DatePipe,
   ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent{

  paymentID: number;
  payment$ : Observable<EmployeePaymentModel | undefined> = of(undefined);
 
  constructor(
   
    private httpPaymentService: PaymentsHttpService,
    private route: ActivatedRoute,
 
  ) 
  {
    
    this.paymentID = Number(this.route.snapshot.params['id']);
    this.httpPaymentService.getItem(this.paymentID)!.subscribe({
      next: (value) =>{
        this.payment$ = of(value);
      }
    })

   }
  
}
