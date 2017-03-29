import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefComponent } from './chef.component';
import { PageComponent } from '../../components/page/page.component';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from '../../components/navigation-item/navigation-item.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';

describe('ChefComponent', () => {
  let component: ChefComponent;
  let fixture: ComponentFixture<ChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChefComponent,
        PageComponent,
        NavigationBarComponent,
        NavigationItemComponent,
        ListItemComponent,
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