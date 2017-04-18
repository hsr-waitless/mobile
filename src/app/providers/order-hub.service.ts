import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrHub } from '../models/signalr-hub';
import { TableModel } from '../models/table.model';
import { RpcExecutor } from '../models/rpc.executor';
import { TableResponseModel } from '../models/table.response.model';
import { OrderModel } from '../models/order.model';
import { OrdersResponseModel } from '../models/orders.response.model';
import { CreateOrderResponseModel } from '../models/create.order.response.model';
import { OrderResponseModel } from '../models/order.response.model';
import { SettingService } from './setting.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class OrderHubService extends SignalrHub {

  private getTableRpc: RpcExecutor<TableResponseModel>;
  private createOrderRpc: RpcExecutor<CreateOrderResponseModel>;
  private getOrdersRpc: RpcExecutor<OrdersResponseModel>;
  private getOrderRpc: RpcExecutor<OrderResponseModel>;

  constructor(zone: NgZone, private settings: SettingService) {
    super('orderhub', zone);
  }

  init(): void {
    this.createOrderRpc = this.rpc('CreateOrder');
    this.getTableRpc = this.rpc('GetAllTables');
    this.getOrderRpc = this.rpc('GetOrder');
    this.getOrdersRpc = this.rpc('GetOrdersByWaiter');
  }

  public getOrders(): Observable<OrderModel[]> {
    return this.settings.identifier$.flatMap(identifier => {
      return this.getOrdersRpc
        .run({ tabletIdentifier: identifier })
        .map(res => {
          return res.orders;
        });
    });
  }

  public getOrder(id: number): Observable<OrderModel> {
    return this.getOrderRpc
      .run({ number: id })
      .map(res => {
        return res.order;
      });
  }

  public createOrder(tableId: number): Observable<OrderModel> {
    return this.settings.identifier$.flatMap(identifier => {
      return this.createOrderRpc
        .run({ tableId: tableId, tabletIdentifier: identifier })
        .map(res => {
          return res.order;
        });
    });
  }

  public getAllTables(): Observable<TableModel[]> {
    return this.getTableRpc
      .run({})
      .map(res => {
        return res.tables;
      });
  }


}
