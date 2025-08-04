import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionDetailComponent } from './deduction-detail.component';

describe('DeductionDetailComponent', () => {
  let component: DeductionDetailComponent;
  let fixture: ComponentFixture<DeductionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
