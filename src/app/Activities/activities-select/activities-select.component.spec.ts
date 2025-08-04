import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ActivitiesSelectComponent } from './activities-select.component';

describe('ActivitiesSelectComponent', () => {
  let component: ActivitiesSelectComponent;
  let fixture: ComponentFixture<ActivitiesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
