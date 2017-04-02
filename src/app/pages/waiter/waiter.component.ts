import { Component, OnInit, ViewChild } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { SidePanelComponent } from '../../components/side-panel/side-panel.component';
import { OrderModel } from '../../models/order.model';

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

  constructor() { }

  ngOnInit() {
    this.actions = [
      { text: 'Bestellungen' },
      { text: 'Aufrufe' }
    ];

    this.orders = [
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] },
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] }
    ];
  }

  add() {
    console.log('add');
    this.panel.show();
  }
}
