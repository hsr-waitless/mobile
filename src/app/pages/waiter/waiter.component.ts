import { Component, OnInit, ViewChild } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { SidePanelComponent } from '../../components/side-panel/side-panel.component';
import { OrderModel } from '../../models/order.model';
import { OrderHubService } from '../../providers/order-hub.service';
import { TableModel } from '../../models/table.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: [ './waiter.component.scss' ]
})
export class WaiterComponent implements OnInit {

  public actions: PageAction[];

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public orders: OrderModel[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.actions = [
      { text: 'Bestellungen', args: 'orders' },
      { text: 'Aufrufe', args: 'calls' }
    ];

    this.orders = [
      { number: 1234, table: 'Table 3', date: new Date(), positions: [] },
      { number: 1234, table: 'Table 3', date: new Date(), positions: [] }
    ];
  }

  selected(page: PageAction) {
    this.router.navigate([ 'waiter', page.args ]);
  }
}
