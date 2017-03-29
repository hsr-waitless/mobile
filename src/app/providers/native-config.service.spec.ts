import { TestBed, inject } from '@angular/core/testing';

import { NativeConfigService } from './native-config.service';
import { PlatformService } from './platform.service';

declare const window: any;

describe('NativeConfigService', () => {
  beforeEach(() => {
    window.plugins = {
      appPreferences: {
        watch: () => {},
        fetch: (key: string) => {},
        set: (key: string, value) => {}
      }
    };

    TestBed.configureTestingModule({
      providers: [
        NativeConfigService,
        PlatformService,
      ]
    });
  });

  it('should ...', inject([ NativeConfigService ], (service: NativeConfigService) => {
    expect(service).toBeTruthy();
  }));
});
