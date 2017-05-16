import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SignalrHub } from '../models/signalr-hub';
import { MenuModel } from '../models/menu.model';
import { RpcExecutor } from '../models/rpc.executor';
import { MenuItemModel } from '../models/menu.item.model';
import { SubMenuModel } from '../models/sub.menu.model';
import 'rxjs/add/operator/map';
import { MenuResponseModel } from '../models/menu.response.model';
import { SubMenuResponseModel } from '../models/submenu.response.model';
import { MenuItemResponseModel } from '../models/menu.item.response.model';

@Injectable()
export class MenuHubService extends SignalrHub {

  private getMenuRpc: RpcExecutor<MenuResponseModel>;
  private getSubMenuRpc: RpcExecutor<SubMenuResponseModel>;
  private getItemTypeRpc: RpcExecutor<MenuItemResponseModel>;
  private getAllItemTypeRpc: RpcExecutor<MenuItemResponseModel>;

  constructor(zone: NgZone) {
    super('menuHub', zone);
  }

  init(): void {
    this.getMenuRpc = this.rpc('GetMenu');
    this.getSubMenuRpc = this.rpc('GetSubMenu');
    this.getItemTypeRpc = this.rpc('GetItemTypes');
    this.getAllItemTypeRpc = this.rpc('GetAllItemType');
  }

  public getMenus(): Observable<MenuModel[]> {
    return this.getMenuRpc
      .run({})
      .map(res => {
        return res.menus;
      });
  }

  public getSubMenus(menuId: number): Observable<SubMenuModel[]> {
    return this.getSubMenuRpc
      .run({ menuId: menuId })
      .map(res => {
        return res.subMenus;
      });
  }

  public getMenuItems(subMenuId: number): Observable<MenuItemModel[]> {
    return this.getItemTypeRpc
      .run({ subMenuId: subMenuId })
      .map(res => {
        return res.items;
      });
  }

  public getAllMenuItems(menuId: number): Observable<MenuItemModel[]> {
    return this.getAllItemTypeRpc
      .run({ menuId: menuId })
      .map(res => {
        return res.items;
      });
  }
}
