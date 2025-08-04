import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsAddEditComponent } from './departments-add-edit.component';

describe('DepartmentsAddEditComponent', () => {
  let component: DepartmentsAddEditComponent;
  let fixture: ComponentFixture<DepartmentsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
