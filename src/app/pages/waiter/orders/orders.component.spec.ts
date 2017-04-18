import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { AppModule } from '../../../app.module';
import { BrowserConfigService } from '../../../providers/browser-config.service';
import { ConfigService } from '../../../models/config.service';
import { SignalrServiceMock } from '../../../providers/signalr.service.mock';
import { SignalrService } from '../../../providers/signalr.service';
import { OrderHubServiceMock } from '../../../providers/order-hub.service.mock';
import { OrderHubService } from '../../../providers/order-hub.service';
import { MenuHubServiceMock } from '../../../providers/menu-hub.service.mock';
import { MenuHubService } from '../../../providers/menu-hub.service';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
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
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
