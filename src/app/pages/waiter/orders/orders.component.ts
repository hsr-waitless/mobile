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
  styleUrls: [ './orders.component.scss' ]
})
export class OrdersComponent implements OnInit {

  @ViewChild('panel')
  public panel: SidePanelComponent;

  public orders$: Observable<OrderModel[]>;
  public tables$: Observable<TableModel[]>;

  constructor(private router: Router,
              private orderHub: OrderHubService) {
  }

  ngOnInit() {
    this.orders$ = this.orderHub.getOrders();
  }

  add() {
    this.panel.show();
    this.tables$ = this.orderHub.getAllTables();
  }

  onTableSelected(table: TableModel) {
    this.orderHub.createOrder(table.id).subscribe(order => {
      this.router.navigate(['waiter', 'detail', order.number]);
    });
  }

  open(order: OrderModel) {
    this.router.navigate([ 'waiter', 'detail', order.number ]);
  }
}
