import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { OrderModel } from '../../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public orders: OrderModel[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.orders = [
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] },
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] }
    ];
  }


  add() {
    console.log('add');
    this.panel.show();
  }

  open(order: OrderModel) {
    this.router.navigate(['waiter', 'detail', order.number]);
  }
}
