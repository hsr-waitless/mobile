import { TestBed, inject } from '@angular/core/testing';

import { NativeConfigService } from './native-config.service';
import { PlatformService } from './platform.service';

describe('NativeConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeConfigService, PlatformService]
    });
  });

  it('should ...', inject([NativeConfigService], (service: NativeConfigService) => {
    expect(service).toBeTruthy();
  }));
});
