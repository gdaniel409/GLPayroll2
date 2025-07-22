import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe} from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { PositionModel } from '../../Models/PositionModel';
import { PositionsHttpService } from '../../Services/Positions/positions.service';
import { DeductionModel } from '../../Models/DeductionModel';
import { DeductionHttpService } from '../../Services/Deductions/deduction-http.service';
import { PayMetricFactoryService } from '../../Factories/pay-metric-factory.service';
import { DeductionTypeFactoryService } from '../../Factories/deduction-type-factory.service';


@Component({
  selector: 'app-deduction-detail',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
  ],
  templateUrl: './deduction-detail.component.html',
  styleUrl: './deduction-detail.component.css'
})
export class DeductionDetailComponent {

  deductionID : number | undefined;
  deduction$ : Observable<DeductionModel> | undefined;
  showamt : boolean = true;
  showpct : boolean = true;

  constructor(
    private httpDeductionService : DeductionHttpService,
    private route: ActivatedRoute,
    private deductionTypeFactory : DeductionTypeFactoryService,
    private payMetricFactory : PayMetricFactoryService,
  ){

     this.deductionID = Number(this.route.snapshot.params['id']);
     httpDeductionService.getItem(this.deductionID)!.subscribe({

      next: (value)=>{

            //standardize these value for view friendly
              value.deductionMetric = this.payMetricFactory.getPayMetricType(value.deductionMetric.id!);
              value.deductionType = this.deductionTypeFactory.getDeductionType(value.deductionType.id!);

              if(value.deductionMetric.id == 1)
              {
                this.showpct = true;
                this.showamt = false;

              }
              else if (value.deductionMetric.id == 2){
                this.showpct = false;
                this.showamt = true;
              }
              else{
                this.showpct = true;
                this.showamt = true;
              }
              this.deduction$ = of(value);
            }

    })
  
  }

}
