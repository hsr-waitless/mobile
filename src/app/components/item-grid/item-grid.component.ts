import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuHubService } from '../../providers/menu-hub.service';
import { MenuModel } from '../../models/menu.model';
import { MenuItemModel } from '../../models/menu.item.model';

@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: [ './item-grid.component.scss' ]
})
export class ItemGridComponent implements OnInit {

  public menus: MenuModel[];
  public items: { [key: number]: MenuItemModel[] };

  @Output()
  public itemSelected: EventEmitter<MenuItemModel> = new EventEmitter<MenuItemModel>();

  constructor(private menuHub: MenuHubService) {
  }

  ngOnInit() {
    this.menuHub.getMenus().subscribe(menus => {
      this.menus = menus;
      this.items = {};
      for (const menu of menus) {
        this.items[ menu.id ] = [];
        this.menuHub.getAllMenuItems(menu.id).subscribe(items => {
          this.items[ menu.id ] = items;
        });
      }
    });
  }

}
