import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefComponent } from './chef.component';
import { AppModule } from '../../app.module';
import { OrderHubService } from '../../providers/order-hub.service';
import { OrderHubServiceMock } from '../../providers/order-hub.service.mock';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: OrderHubService, useClass: OrderHubServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
