import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHubService } from '../../../providers/order-hub.service';
import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../../../models/order.model';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { TabletHubService } from '../../../providers/tablet-hub.service';
import { TabletModel } from '../../../models/tablet.model';
import { TabletMode } from '../../../models/tablet-mode.enum';
import { MenuItemModel } from '../../../models/menu.item.model';
import { OrderPositionModel } from '../../../models/order-position.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.scss' ]
})
export class DetailComponent implements OnInit {

  @ViewChild('tabletPanel')
  public tabletPanel: SidePanelComponent;

  @ViewChild('positionPanel')
  public positionPanel: SidePanelComponent;

  public orderId: number;
  public order: OrderModel;
  public tablets$: Observable<TabletModel[]>;

  constructor(public route: ActivatedRoute,
              public tabletHub: TabletHubService,
              public orderHub: OrderHubService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = parseInt(params[ 'id' ], 0);
      this.orderHub.getOrder(this.orderId).subscribe(order => {
        this.order = order;
      });
    });
  }

  addTablet() {
    this.tabletPanel.show();
    this.tablets$ = this.tabletHub.getTables(TabletMode.Guest);
  }

  addPosition() {
    this.positionPanel.show();
  }

  itemSelected(item: MenuItemModel) {
    this.orderHub.addOrderPos(this.orderId, item.id).subscribe(order => {
      this.order = order;
    });
  }

  amountChanged(position: OrderPositionModel, amount: number) {
    position.amount = amount;
    this.orderHub.updateOrderPos(this.orderId, position.id, amount, '').subscribe(order => {
      this.order = order;
    });
  }

  tabletSelected(tablet: TabletModel) {
    this.orderHub.assignOrder(this.orderId, tablet.identifier).subscribe(res => {
      console.log('assing', res);
    });
  }

  tabletUnselected(tablet: TabletModel) {
    this.orderHub.unassignOrder(this.orderId, tablet.identifier).subscribe(res => {
      console.log('unassing', res);
    });
  }
}
