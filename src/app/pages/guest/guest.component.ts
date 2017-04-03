import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuHubService } from '../../providers/menu-hub.service';
import { MenuModel } from '../../models/menu.model';
import { SubMenuModel } from '../../models/sub.menu.model';
import { Observable } from 'rxjs/Observable';
import { PageAction } from '../../models/page.action';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: [ './guest.component.scss' ]
})
export class GuestComponent implements OnInit {
  public actions: PageAction[] = [];

  public menus$: Observable<MenuModel[]>;
  public subMenus$: Observable<SubMenuModel[]>;

  constructor(private menu: MenuHubService) {
  }

  ngOnInit() {
    this.menus$ = this.menu.getMenus();
    this.subMenus$ = Observable.of([]);
    this.menus$.subscribe(menus => {
      this.actions = menus
        .sort((a, b) => a.order - b.order)
        .map(menu => ({ text: menu.name, args: menu }));
    });
  }

  selectAction(action: PageAction) {
    this.subMenus$ = this.menu.getSubMenus(action.args.id).map(menus => {
      return menus.sort((a, b) => a.order - b.order);
    });
  }
}
