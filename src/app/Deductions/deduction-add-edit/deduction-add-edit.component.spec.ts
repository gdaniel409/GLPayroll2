import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionAddEditComponent } from './deduction-add-edit.component';

describe('DeductionAddEditComponent', () => {
  let component: DeductionAddEditComponent;
  let fixture: ComponentFixture<DeductionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
