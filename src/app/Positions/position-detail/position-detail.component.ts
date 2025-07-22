import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe} from '@angular/common';
import { MatLabel } from '@angular/material/input';
import { PositionModel } from '../../Models/PositionModel';
import { PositionsHttpService } from '../../Services/Positions/positions.service';

@Component({
  selector: 'app-position-detail',
  imports: [
    MatListModule,
    AsyncPipe,
    MatLabel,
  ],
  templateUrl: './position-detail.component.html',
  styleUrl: './position-detail.component.css'
})
export class PositionDetailComponent {

  positionID : number | undefined;
  position$ : Observable<PositionModel> | undefined;

  constructor(
    private httpPositionService : PositionsHttpService,
    private route: ActivatedRoute,
  ){

     this.positionID = Number(this.route.snapshot.params['id']);
     httpPositionService.getItem(this.positionID)!.subscribe({

      next: (value)=>{
              this.position$ = of(value);
            }

    })
  
  }
 
}
