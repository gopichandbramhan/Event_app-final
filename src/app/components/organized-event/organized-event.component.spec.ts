import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizedEventComponent } from './organized-event.component';

describe('OrganizedEventComponent', () => {
  let component: OrganizedEventComponent;
  let fixture: ComponentFixture<OrganizedEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizedEventComponent]
    });
    fixture = TestBed.createComponent(OrganizedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
