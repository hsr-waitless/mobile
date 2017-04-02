import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestComponent } from './guest.component';
import { SubMenuItemComponent } from '../../components/sub-menu-item/sub-menu-item.component';
import { PageComponent } from '../../components/page/page.component';
import { MenuItemComponent } from '../../components/menu-item/menu-item.component';
import { PricePipe } from '../../pipes/price-pipe';
import { NavigationItemComponent } from '../../components/navigation-item/navigation-item.component';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { MenuHubService } from '../../providers/menu-hub.service';
import { MenuHubServiceMock } from '../../providers/menu-hub.service.mock';

describe('GuestComponent', () => {
  let component: GuestComponent;
  let fixture: ComponentFixture<GuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GuestComponent,
        SubMenuItemComponent,
        MenuItemComponent,
        PageComponent,
        NavigationItemComponent,
        NavigationBarComponent,
        PricePipe
      ],
      providers: [
        { provide: MenuHubService, useClass: MenuHubServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
