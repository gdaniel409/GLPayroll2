import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionListComponent } from './deductionList.component';

describe('DeductionListComponent', () => {
  let component: DeductionListComponent;
  let fixture: ComponentFixture<DeductionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
