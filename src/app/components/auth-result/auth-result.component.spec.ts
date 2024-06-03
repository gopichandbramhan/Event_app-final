import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResultComponent } from './auth-result.component';

describe('AuthResultComponent', () => {
  let component: AuthResultComponent;
  let fixture: ComponentFixture<AuthResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthResultComponent]
    });
    fixture = TestBed.createComponent(AuthResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
