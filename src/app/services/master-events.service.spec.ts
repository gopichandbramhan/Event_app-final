import { TestBed } from '@angular/core/testing';

import { MasterEventsService } from './master-events.service';

describe('MasterEventsService', () => {
  let service: MasterEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
