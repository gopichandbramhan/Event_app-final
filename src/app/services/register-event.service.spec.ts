import { TestBed } from '@angular/core/testing';

import { RegisterEventService } from './register-event.service';

describe('RegisterEventService', () => {
  let service: RegisterEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
