import {Component, OnInit, ViewChild} from '@angular/core';
import {PageAction} from '../../models/page.action';
import {SidePanelComponent} from '../../components/side-panel/side-panel.component';
import {OrderModel} from '../../models/order.model';
import {OrderHubService} from '../../providers/order-hub.service';
import {Observable} from 'rxjs';
import {TableModel} from '../../models/table.model';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  public actions: PageAction[];

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public orders: OrderModel[];
  public tables$: Observable<TableModel[]>;

  constructor(private orderHub: OrderHubService) {
  }

  ngOnInit() {
    this.actions = [
      {text: 'Bestellungen'},
      {text: 'Aufrufe'}
    ];

    this.orders = [
      {number: 1234, table: 'Table 3', date: new Date(), positions: []},
      {number: 1234, table: 'Table 3', date: new Date(), positions: []}
    ];

    this.tables$ = this.orderHub.getTables();
  }

  add() {
    console.log('add');
    this.panel.show();
  }
}
