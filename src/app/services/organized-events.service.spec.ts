import { TestBed } from '@angular/core/testing';

import { OrganizedEventsService } from './organized-events.service';

describe('OrganizedEventsService', () => {
  let service: OrganizedEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizedEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
