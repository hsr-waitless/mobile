import { Component, Input, OnInit } from '@angular/core';
import { SubMenuModel } from '../../models/sub.menu.model';
import { Observable } from 'rxjs/Observable';
import { MenuItemModel } from '../../models/menu.item.model';
import { MenuHubProvider } from '../../providers/menu-hub-provider';

@Component({
  selector: 'app-sub-menu-item',
  templateUrl: 'sub-menu-item.component.html',
  styleUrls: [ './sub-menu-item.component.scss' ]
})
export class SubMenuItemComponent implements OnInit {

  @Input()
  public subMenu: SubMenuModel;

  public items$: Observable<MenuItemModel[]>;

  constructor(private menuHub: MenuHubProvider) {
  }

  ngOnInit() {
    this.items$ = this.menuHub.getMenuItems(this.subMenu.id);
  }
}
