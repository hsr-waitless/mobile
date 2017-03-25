import { TestBed, inject } from '@angular/core/testing';

import { BrowserConfigService } from './browser-config.service';

describe('BrowserConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserConfigService]
    });
  });

  it('should ...', inject([BrowserConfigService], (service: BrowserConfigService) => {
    expect(service).toBeTruthy();
  }));
});
