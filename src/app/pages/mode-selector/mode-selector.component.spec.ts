import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelectorComponent } from './mode-selector.component';
import { SettingService } from '../../providers/setting.service';
import { ConfigService } from '../../models/config.service';
import { BrowserConfigService } from '../../providers/browser-config.service';

describe('ModeSelectorComponent', () => {
  let component: ModeSelectorComponent;
  let fixture: ComponentFixture<ModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeSelectorComponent ],
      providers: [
        SettingService,
        { provide: ConfigService, useClass: BrowserConfigService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
