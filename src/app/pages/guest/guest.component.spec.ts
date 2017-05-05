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
import { Observable } from 'rxjs';

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

  it('should build menu navigation in right order', () => {
    component.menu.getMenus = () => {
      return Observable.of([
        { name: 'Hauptgerichte', order: 2 },
        { name: 'Deserts', order: 3 },
        { name: 'Vorspeise', order: 1 },
      ]);
    };
    component.ngOnInit();
    expect(component.actions).toBeTruthy();
    expect(component.actions.length).toBe(3);
    expect(component.actions[0].text).toBe('Vorspeise');
    expect(component.actions[1].text).toBe('Hauptgerichte');
    expect(component.actions[2].text).toBe('Deserts');
  });

  it('should load sub menu', (done) => {
    component.menu.getSubMenus = (id: number) => {
      expect(id).toBe(12);
      return Observable.of([
        { name: 'Suppe', order: 2 },
        { name: 'Salat', order: 1 },
      ]);
    };
    component.selectAction({ args: {id: 12}} as any);
    expect(component.subMenus$).toBeTruthy();
    component.subMenus$.subscribe(subMenus => {
      expect(subMenus).toBeTruthy();
      expect(subMenus.length).toBe(2);
      expect(subMenus[0].name).toBe('Salat');
      expect(subMenus[1].name).toBe('Suppe');
      done();
    });
  });
});
