import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidePanelComponent } from '../../../components/side-panel/side-panel.component';
import { OrderModel } from '../../../models/order.model';
import { OrderHubService } from '../../../providers/order-hub.service';
import { TableModel } from '../../../models/table.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public orders: OrderModel[];
  public tables$: Observable<TableModel[]>;

  constructor(private router: Router,
              private orderHub: OrderHubService) { }

  ngOnInit() {
    this.orders = [
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] },
      {  number: 1234, table: 'Table 3', date: new Date(), positions: [] }
    ];
  }


  add() {
    this.panel.show();
    this.tables$ = this.orderHub.getAllTables();
  }

  open(order: OrderModel) {
    this.router.navigate(['waiter', 'detail', order.number]);
  }
}
