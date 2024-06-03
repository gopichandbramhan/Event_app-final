import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEventRegisterComponent } from './user-event-register.component';

describe('UserEventRegisterComponent', () => {
  let component: UserEventRegisterComponent;
  let fixture: ComponentFixture<UserEventRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEventRegisterComponent]
    });
    fixture = TestBed.createComponent(UserEventRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
