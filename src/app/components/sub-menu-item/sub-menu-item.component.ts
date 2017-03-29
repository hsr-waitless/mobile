import { Component, Input } from '@angular/core';
import { SubMenuModel } from '../../models/sub.menu.model';
import { Observable } from 'rxjs/Observable';
import { MenuItemModel } from '../../models/menu.item.model';
import { ItemCategory } from '../../models/item.category.item';

@Component({
  selector: 'app-sub-menu-item',
  templateUrl: 'sub-menu-item.component.html',
  styleUrls: [ './sub-menu-item.component.scss' ]
})
export class SubMenuItemComponent {

  @Input()
  public subMenu: SubMenuModel;

  public items$: Observable<MenuItemModel[]>;

  constructor() {
    this.items$ = Observable.of([
      {
        title: 'Grüner Salat',
        description: 'Frische Blattsalate',
        price: 9.50,
        currency: 'CHF',
        category: ItemCategory.Vegan
      },
      {
        title: 'Gemischter Salat',
        description: 'Saisonaler Salatmix',
        price: 13.50,
        currency: 'CHF',
        category: ItemCategory.Vegan
      },
      {
        title: '«Churrasco»–Salat',
        description: 'Blattsalat mit Speck, Cherry–Tomaten, Avocadowürfeln und Brotcroûtons',
        price: 16.00,
        currency: 'CHF',
        category: ItemCategory.Vegan
      },
      {
        title: 'Basilikum–Tomatensalat',
        description: 'Tomaten in Scheiben, angemacht mit gereiftem Aceto Balsamico, Basilikumblättern und Zwiebelringen',
        price: 11.50,
        currency: 'CHF',
        category: ItemCategory.Vegan
      },
    ]);
  }
}
