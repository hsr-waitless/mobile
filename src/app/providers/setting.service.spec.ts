import { TestBed, inject } from '@angular/core/testing';

import { SettingService } from './setting.service';
import { ConfigService } from '../models/config.service';
import { BrowserConfigService } from './browser-config.service';

describe('SettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingService,
        { provide: ConfigService, useClass: BrowserConfigService }
      ],
    });
  });

  it('should ...', inject([SettingService], (service: SettingService) => {
    expect(service).toBeTruthy();
  }));
});
