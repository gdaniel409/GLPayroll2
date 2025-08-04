import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionsSelectComponent } from './deductions-select.component';

describe('DeductionsSelectComponent', () => {
  let component: DeductionsSelectComponent;
  let fixture: ComponentFixture<DeductionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionsSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
