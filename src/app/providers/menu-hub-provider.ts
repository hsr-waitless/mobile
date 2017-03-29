import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrHub } from '../models/signalr-hub';
import { MenuModel } from '../models/menu.model';
import { RpcExecutor } from '../models/rpc.executor';
import { MenuItemModel } from '../models/menu.item.model';
import { SubMenuModel } from '../models/sub.menu.model';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuHubProvider extends SignalrHub {

  private getMenuRpc: RpcExecutor<MenuModel[]>;
  private getSubMenuRpc: RpcExecutor<SubMenuModel[]>;
  private getItemTypeRpc: RpcExecutor<MenuItemModel[]>;

  constructor() {
    super('menuHub');
  }

  init(): void {
    this.getMenuRpc = this.rpc('GetMenu');
    this.getSubMenuRpc = this.rpc('GetSubMenu');
    this.getItemTypeRpc = this.rpc('GetItemType');
  }

  connected(): void {

  }

  public getMenus(): Observable<MenuModel[]> {
    return this.getMenuRpc.run();
  }

  public getSubMenus(menuId: number): Observable<SubMenuModel[]> {
    return this.getSubMenuRpc.run(menuId);
  }

  public getMenuItems(subMenuId: number): Observable<MenuItemModel[]> {
    return this.getItemTypeRpc.run(subMenuId);
  }
}
