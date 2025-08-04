import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmensListComponent } from './deparmens-list.component';

describe('DeparmensListComponent', () => {
  let component: DeparmensListComponent;
  let fixture: ComponentFixture<DeparmensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeparmensListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
