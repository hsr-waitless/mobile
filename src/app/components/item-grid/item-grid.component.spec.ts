import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridComponent } from './item-grid.component';
import { MenuHubServiceMock } from '../../providers/menu-hub.service.mock';
import { MenuHubService } from '../../providers/menu-hub.service';

describe('ItemGridComponent', () => {
  let component: ItemGridComponent;
  let fixture: ComponentFixture<ItemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGridComponent ],
      providers: [
        {provide: MenuHubService, useClass: MenuHubServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
