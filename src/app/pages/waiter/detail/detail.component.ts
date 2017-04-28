import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHubService } from '../../../providers/order-hub.service';
import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../../../models/order.model';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { TabletHubService } from '../../../providers/tablet-hub.service';
import { TabletModel } from '../../../models/tablet.model';
import { TabletMode } from '../../../models/tablet-mode.enum';
import { MenuHubService } from '../../../providers/menu-hub.service';
import { MenuModel } from '../../../models/menu.model';
import { MenuItemModel } from '../../../models/menu.item.model';

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

  public order$: Observable<OrderModel>;
  public tablets$: Observable<TabletModel[]>;

  constructor(private route: ActivatedRoute,
              private tabletHub: TabletHubService,
              private orderHub: OrderHubService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order$ = this.orderHub.getOrder(params[ 'id' ]);
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
    console.log(item);
  }
}
