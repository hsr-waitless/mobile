import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterComponent } from './waiter.component';
import { PageComponent } from '../../components/page/page.component';
import { SidePanelComponent } from '../../components/side-panel/side-panel.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { NavigationItemComponent } from '../../components/navigation-item/navigation-item.component';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WaiterComponent', () => {
  let component: WaiterComponent;
  let fixture: ComponentFixture<WaiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        WaiterComponent,
        PageComponent,
        ListItemComponent,
        SidePanelComponent,
        NavigationItemComponent,
        NavigationBarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
