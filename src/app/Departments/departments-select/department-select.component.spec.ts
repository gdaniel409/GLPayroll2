import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSelectComponent } from './department-select.component';

describe('DepartmentSelectComponent', () => {
  let component: DepartmentSelectComponent;
  let fixture: ComponentFixture<DepartmentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
