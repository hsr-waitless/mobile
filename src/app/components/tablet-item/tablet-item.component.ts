import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabletModel } from '../../models/tablet.model';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-tablet-item',
  templateUrl: './tablet-item.component.html',
  styleUrls: [ './tablet-item.component.scss' ]
})
export class TabletItemComponent {

  @Input()
  public tablet: TabletModel;

  @Input()
  public order: OrderModel;

  @Output()
  public select: EventEmitter<TabletModel> = new EventEmitter<TabletModel>();

  @Output()
  public unselect: EventEmitter<TabletModel> = new EventEmitter<TabletModel>();

  public get canSelect() {
    return this.order && this.order.number !== this.tablet.orderId;
  }

  public get canUnselect() {
    return this.order && this.order.number === this.tablet.orderId;
  }
}
