import { Component, OnInit } from '@angular/core';
import { MenuHubProvider } from '../../providers/menu-hub-provider';
import { MenuModel } from '../../models/menu.model';
import { SubMenuModel } from '../../models/sub.menu.model';
import { Observable } from 'rxjs/Observable';
import { PageAction } from '../../models/page.action';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: [ './guest.component.scss' ]
})
export class GuestComponent implements OnInit {

  public menus$: Observable<MenuModel[]>;
  public subMenus$: Observable<SubMenuModel[]>;

  constructor(private menu: MenuHubProvider) {
    this.menus$ = Observable.of([
      { name: 'Vorspeisen', order: 2 },
      { name: 'Hauptgerichte', order: 3 },
      { name: 'Spezialitäten', order: 4 },
      { name: 'Nachspeisen', order: 5 },
      { name: 'Getränke', order: 6 }
    ]);

    this.subMenus$ = Observable.of([
      { name: 'Salate', order: 1 },
      { name: 'Suppen', order: 2 },
      { name: 'Sonstiges', order: 2 }
    ]);
  }

  public get actions(): Observable<PageAction[]> {
    return this.menus$.map(menus => menus.map(menu => ({ text: menu.name, args: menu })));
  }

  ngOnInit() {
    /*this.menu.getMenus().subscribe(res => {
     console.log('menu', res);
     });*/
  }

  selectAction(action: PageAction) {

  }
}
