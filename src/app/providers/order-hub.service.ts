import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrHub } from '../models/signalr-hub';
import { TableModel } from '../models/table.model';
import { RpcExecutor } from '../models/rpc.executor';
import 'rxjs/add/operator/map';
import { TableResponseModel } from '../models/table.response.model';

@Injectable()
export class OrderHubService extends SignalrHub {

  private getTableRpc: RpcExecutor<TableResponseModel>;

  constructor(zone: NgZone) {
    super('orderhub', zone);
  }

  init(): void {
    this.getTableRpc = this.rpc('GetAllTables');
  }

  connected(): void {

  }

  public getAllTables(): Observable<TableModel[]> {
    return this.getTableRpc
      .run({})
      .map(res => {
        return res.tables;
      });
  }




}
