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
import { SuccessResponseModel } from '../models/sucess.response.model';
import { OrderStatus } from '../models/order.status';
import { OrderPosStatus } from '../models/order.pos.status';
import { OrderPositionModel } from '../models/order-position.model';
import { OrderPosResponseModel } from '../models/order.pos.response.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrderHubService extends SignalrHub {
  private reloadSubject: Subject<string> = new Subject<string>();
  private getTableRpc: RpcExecutor<TableResponseModel>;
  private createOrderRpc: RpcExecutor<CreateOrderResponseModel>;
  private getOrdersRpc: RpcExecutor<OrdersResponseModel>;
  private getOrderRpc: RpcExecutor<OrderResponseModel>;
  private addOrderPosRpc: RpcExecutor<OrderResponseModel>;
  private removeOrderPosRpc: RpcExecutor<OrderResponseModel>;
  private updateOrderPosRpc: RpcExecutor<OrderResponseModel>;
  private doAssignOrderRpc: RpcExecutor<SuccessResponseModel>;
  private doUnassignOrderRpc: RpcExecutor<SuccessResponseModel>;
  private getOrdersByStatusRpc: RpcExecutor<OrdersResponseModel>;
  private doChangeStatusOrderPosRpc: RpcExecutor<OrderPosResponseModel>;
  private doChangeStatusOrderRpc: RpcExecutor<OrderResponseModel>;

  constructor(zone: NgZone, private settings: SettingService) {
    super('orderhub', zone);
  }

  init(): void {
    this.createOrderRpc = this.rpc('CreateOrder');
    this.getTableRpc = this.rpc('GetAllTables');
    this.getOrderRpc = this.rpc('GetOrder');
    this.getOrdersRpc = this.rpc('GetOrdersByWaiter');
    this.addOrderPosRpc = this.rpc('CreateOrderPos');
    this.removeOrderPosRpc = this.rpc('DoDeleteOrderPos');
    this.updateOrderPosRpc = this.rpc('DoUpdateOrderPos');
    this.doAssignOrderRpc = this.rpc('DoAssignOrder');
    this.doUnassignOrderRpc = this.rpc('DoUnassignOrder');
    this.getOrdersByStatusRpc = this.rpc('GetOrdersByStatus');
    this.doChangeStatusOrderPosRpc = this.rpc('DoChangeStatusOrderPos');
    this.doChangeStatusOrderRpc = this.rpc('DoChangeStatusOrder');


    this.on<any>('DoSendInfoEvent').subscribe(infoEvent => {
      this.reloadSubject.next(infoEvent.Info);
    });
  }

  public get reload$(): Observable<string> {
    return this.reloadSubject.asObservable();
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

  public getOrdersByStatus(status: OrderPosStatus): Observable<OrderModel[]> {
    return this.getOrdersByStatusRpc
      .run({ status: status })
      .map(res => {
        return res.orders;
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

  public addOrderPos(orderId: number, itemTypeId: number): Observable<OrderModel> {
    return this.addOrderPosRpc
      .run({
        orderId: orderId,
        itemTypeId: itemTypeId
      })
      .map(res => res.order);
  }

  public updateOrderPos(orderId: number, orderPosId: number, amount: number, comment: string): Observable<OrderModel> {
    return this.updateOrderPosRpc
      .run({
        orderId: orderId,
        orderPosId: orderPosId,
        amount: amount,
        comment: comment
      })
      .map(res => res.order);
  }

  public removeOrderPos(orderId: number, orderPosId: number): Observable<OrderModel> {
    return this.addOrderPosRpc
      .run({
        orderId: orderId,
        positionId: orderPosId
      })
      .map(res => res.order);
  }

  public assignOrder(orderId: number, tabletIdentifier: string): Observable<boolean> {
    return this.doAssignOrderRpc
      .run({
        orderId: orderId,
        tabletIdentifier: tabletIdentifier
      })
      .map(res => res.success);
  }

  public doUpdateOrderStatus(orderId: number, status: OrderStatus): Observable<OrderModel> {
    return this.doChangeStatusOrderRpc
      .run({
        number: orderId,
        orderStatus: status
      })
      .map(res => res.order);
  }

  public doUpdateOrderPosStatus(orderPosId: number, status: OrderPosStatus): Observable<OrderPositionModel> {
    return this.doChangeStatusOrderPosRpc
      .run({
        id: orderPosId,
        status: status
      })
      .map(res => res.orderPos);
  }

  public unassignOrder(orderId: number, tabletIdentifier: string): Observable<boolean> {
    return this.doUnassignOrderRpc
      .run({
        orderId: orderId,
        tabletIdentifier: tabletIdentifier
      })
      .map(res => res.success);
  }
}
