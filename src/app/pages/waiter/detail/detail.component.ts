import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHubService } from '../../../providers/order-hub.service';
import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../../../models/order.model';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { TabletHubService } from '../../../providers/tablet-hub.service';
import { TabletModel } from '../../../models/tablet.model';
import { TabletMode } from '../../../models/tablet-mode.enum';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public order$: Observable<OrderModel>;
  public tablets$: Observable<TabletModel[]>;

  constructor(private route: ActivatedRoute,
              private tabletHub: TabletHubService,
              private orderHub: OrderHubService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order$ = this.orderHub.getOrder(params['id']);
    });
  }

  add() {
    this.panel.show();
    this.tablets$ = this.tabletHub.getTables(TabletMode.Guest);
  }

}
