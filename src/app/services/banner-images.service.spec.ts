import { TestBed } from '@angular/core/testing';

import { BannerImagesService } from './banner-images.service';

describe('BannerImagesService', () => {
  let service: BannerImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
