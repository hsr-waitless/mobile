import { Component, OnInit } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { OrderModel } from '../../models/order.model';
import { OrderHubService } from '../../providers/order-hub.service';
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

  public openOrders: OrderModel[] = null;
  public activeOrders: OrderModel[] = null;
  public doneOrders: OrderModel[] = null;
  public orders: OrderModel[] = null;

  constructor(private orderHub: OrderHubService) {

  }

  ngOnInit() {
    this.pages = [
      { text: 'Offen' },
      { text: 'Aktiv' },
      { text: 'Erledigt' }
    ];

    this.orderHub.reload$.subscribe(() => {
      this.reload(true);
    });

    this.reload(false);
  }

  get viewOpen() {
    return this.selectedPage && this.selectedPage.text.startsWith('Offen');
  }

  get viewActive() {
    return this.selectedPage && this.selectedPage.text.startsWith('Aktiv');
  }

  get viewDone() {
    return this.selectedPage && this.selectedPage.text.startsWith('Erledigt');
  }

  reload(force: boolean) {
    this.orderHub.getOrdersByStatus(OrderPosStatus.New).subscribe(orders => {
      this.openOrders = orders;
      this.pages[0].text = `Offen (${this.openOrders.reduce((prev, curr) => prev + curr.positions.length, 0)})`;
      if (this.orders == null || force) {
        this.select(this.selectedPage);
      }
    });

    this.orderHub.getOrdersByStatus(OrderPosStatus.Active).subscribe(orders => {
      this.activeOrders = orders;
      this.pages[1].text = `Aktiv (${this.activeOrders.reduce((prev, curr) => prev + curr.positions.length, 0)})`;
      if (this.orders == null || force) {
        this.select(this.selectedPage);
      }
    });

    this.orderHub.getOrdersByStatus(OrderPosStatus.Done).subscribe(orders => {
      this.doneOrders = orders;
      this.pages[2].text = `Erledigt (${this.doneOrders.reduce((prev, curr) => prev + curr.positions.length, 0)})`;
      if (this.orders == null || force) {
        this.select(this.selectedPage);
      }
    });
  }

  select(action: PageAction) {
    this.selectedPage = action;
    this.orders = null;

    if (!this.selectedPage) {
      return;
    }

    if (this.viewOpen) {
      this.orders = this.openOrders;
    } else if (this.viewActive) {
      this.orders = this.activeOrders;
    } else if (this.viewDone) {
      this.orders = this.doneOrders;
    }
  }

  isPositionOpen(position: OrderPositionModel) {
    return position && position.posStatus === OrderPosStatus.New;
  }

  isPositionActive(position: OrderPositionModel) {
    return position && position.posStatus === OrderPosStatus.Active;
  }

  isPositionDone(position: OrderPositionModel) {
    return position && position.posStatus === OrderPosStatus.Done;
  }

  startPosition(order: OrderModel, position: OrderPositionModel, index: number) {
    this.orderHub.doUpdateOrderPosStatus(position.id, OrderPosStatus.Active).subscribe(pos => {
      order.positions[ index ] = pos;
    });
  }

  donePosition(order: OrderModel, position: OrderPositionModel, index: number) {
    this.orderHub.doUpdateOrderPosStatus(position.id, OrderPosStatus.Done).subscribe(pos => {
      order.positions[ index ] = pos;
    });
  }

  reactivatePosition(order: OrderModel, position: OrderPositionModel, index: number) {
    this.orderHub.doUpdateOrderPosStatus(position.id, OrderPosStatus.New).subscribe(pos => {
      order.positions[ index ] = pos;
    });
  }
}
