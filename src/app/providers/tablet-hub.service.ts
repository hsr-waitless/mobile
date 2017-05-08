import { Injectable, NgZone } from '@angular/core';
import { SignalrHub } from '../models/signalr-hub';
import { RpcExecutor } from '../models/rpc.executor';
import { Observable } from 'rxjs/Observable';
import { TabletMode } from '../models/tablet-mode.enum';
import { SettingService } from './setting.service';
import { TabletModel } from '../models/tablet.model';

@Injectable()
export class TabletHubService extends SignalrHub {

  private setModeRpc: RpcExecutor<{ isTabletNew: boolean }>;
  private getTabletsByMode: RpcExecutor<{ tablets: TabletModel[] }>;

  constructor(zone: NgZone, private settings: SettingService) {
    super('tablethub', zone);
  }

  init(): void {
    this.setModeRpc = this.rpc('DoAssignTablet');
    this.getTabletsByMode = this.rpc('GetTabletsByMode');

    this.on<TabletMode>('onModeAssigned').subscribe(mode => {
      this.settings.setMode(mode);
    });
  }

  public setMode(mode: TabletMode, tabletIdentifier: string): Observable<boolean> {
    return this.setModeRpc
      .run({ mode: mode, tabletIdentifier: tabletIdentifier })
      .map(res => {
        return res.isTabletNew;
      });
  }

  public getTables(mode: TabletMode): Observable<TabletModel[]> {
    return this.getTabletsByMode
      .run({ mode: mode })
      .map(res => {
        return res.tablets;
      });
  }
}
