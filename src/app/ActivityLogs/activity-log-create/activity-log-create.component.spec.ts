import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogCreateComponent } from './activity-log-create.component';

describe('ActivityLogCreateComponent', () => {
  let component: ActivityLogCreateComponent;
  let fixture: ComponentFixture<ActivityLogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityLogCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityLogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
