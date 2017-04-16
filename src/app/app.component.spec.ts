import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { SettingService } from './providers/setting.service';
import { BrowserConfigService } from './providers/browser-config.service';
import { ConfigService } from './models/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SignalrService } from './providers/signalr.service';
import { SignalrServiceMock } from './providers/signalr.service.mock';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        SettingService,
        { provide: SignalrService, useClass: SignalrServiceMock },
        { provide: ConfigService, useClass: BrowserConfigService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
