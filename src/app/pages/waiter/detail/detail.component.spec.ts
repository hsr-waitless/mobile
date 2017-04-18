import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { AppModule } from '../../../app.module';
import { BrowserConfigService } from '../../../providers/browser-config.service';
import { ConfigService } from '../../../models/config.service';
import { SignalrServiceMock } from '../../../providers/signalr.service.mock';
import { SignalrService } from '../../../providers/signalr.service';
import { MenuHubServiceMock } from '../../../providers/menu-hub.service.mock';
import { MenuHubService } from '../../../providers/menu-hub.service';
import { OrderHubService } from '../../../providers/order-hub.service';
import { OrderHubServiceMock } from '../../../providers/order-hub.service.mock';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        { provide: SignalrService, useClass: SignalrServiceMock },
        { provide: OrderHubService, useClass: OrderHubServiceMock },
        { provide: MenuHubService, useClass: MenuHubServiceMock },
        { provide: ConfigService, useClass: BrowserConfigService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
