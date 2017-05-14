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
import { Observable } from 'rxjs/Observable';

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

  it('should load order on init', () => {
    component.route.params = Observable.of({ 'id': 2 });
    component.orderHub.getOrder = (id: number) => {
      expect(id).toBe(2);
      return Observable.of({});
    };
    component.ngOnInit();
    expect(component.orderId).toBe(2);
    expect(component.order).toBeTruthy();
  });

  it('should update order pos amount', (done) => {
    component.orderHub.updateOrderPos = (orderId: number, posId: number, amount: number, comment: string) => {
      expect(orderId).toBe(12);
      expect(posId).toBe(1);
      expect(amount).toBe(2);
      done();
      return Observable.of(null);
    };
    component.orderId = 12;
    component.amountChanged({
      amount: 1,
      id: 1
    } as any, 2);
  });
});
