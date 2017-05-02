import { Component, OnInit } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: [ './chef.component.scss' ]
})
export class ChefComponent implements OnInit {

  public pages: PageAction[];
  public orders: OrderModel[];
  public selectedPage: PageAction;

  constructor() {
  }

  ngOnInit() {
    this.pages = [
      { text: 'Offen' },
      { text: 'Aktiv' },
      { text: 'Erledigt' }
    ];

    this.orders = [];
  }

  select(action: PageAction) {
    this.selectedPage = action;
  }
}
