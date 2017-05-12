import { Component, OnInit } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { OrderModel } from '../../models/order.model';
import { OrderHubService } from '../../providers/order-hub.service';
import { Observable } from 'rxjs/Observable';
import { OrderStatus } from '../../models/order.status';
import { OrderPositionModel } from '../../models/order-position.model';
import { OrderPosStatus } from '../../models/order.pos.status';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: [ './chef.component.scss' ]
})
export class ChefComponent implements OnInit {

  public selectedPage: PageAction;
  public pages: PageAction[];

  public openOrders: OrderModel[];
  public activeOrders: OrderModel[];
  public doneOrders: OrderModel[];
  public orders: OrderModel[];

  constructor(private orderHub: OrderHubService) {
    this.orderHub.getOrdersByStatus(OrderStatus.New).subscribe(orders => {
      this.openOrders = orders;
      this.select(this.selectedPage);
    });
    this.orderHub.getOrdersByStatus(OrderStatus.Active).subscribe(orders => {
      this.activeOrders = orders;
      this.select(this.selectedPage);
    });
    this.orderHub.getOrdersByStatus(OrderStatus.Done).subscribe(orders => {
      this.doneOrders = orders;
      this.select(this.selectedPage);
    });
  }

  ngOnInit() {
    this.pages = [
      { text: 'Offen' },
      { text: 'Aktiv' },
      { text: 'Erledigt' }
    ];
  }

  get viewOpen() {
    return this.selectedPage && this.selectedPage.text === 'Offen';
  }

  select(action: PageAction) {
    this.selectedPage = action;
    this.orders = null;

    if (!this.selectedPage) {
      return;
    }

    if (this.selectedPage.text === 'Offen') {
      this.orders = this.openOrders;
    } else if (this.selectedPage.text === 'Aktive') {
      this.orders = this.activeOrders;
    } else if (this.selectedPage.text === 'Erledigt') {
      this.orders = this.doneOrders;
    }
  }

  isPositionOpen(position: OrderPositionModel) {
    return position.posStatus === OrderPosStatus.New;
  }

  startPosition(position: OrderPositionModel) {

  }
}
