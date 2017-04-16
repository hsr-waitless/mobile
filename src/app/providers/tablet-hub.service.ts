import { Injectable, NgZone } from '@angular/core';
import { SignalrHub } from '../models/signalr-hub';
import { RpcExecutor } from '../models/rpc.executor';
import { Observable } from 'rxjs/Observable';
import { TabletMode } from '../models/tablet-mode.enum';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class TabletHubService extends SignalrHub {

  private doAssignTabletRpc: RpcExecutor<{ isTabletNew: boolean }>;
  private onAssignedTabletSubject = new ReplaySubject<TabletMode>();


  constructor(zone: NgZone) {
    super('tablethub', zone);
  }

  public get onAssignedTablet(): Observable<TabletMode> {
    return this.onAssignedTabletSubject.asObservable();
  }

  init(): void {
    this.doAssignTabletRpc = this.rpc('DoAssignTablet');
    this.on<TabletMode>('onAssignedTablet').subscribe(mode => {
      this.onAssignedTabletSubject.next(mode);
    });
  }

  connected(): void {
  }

  public doAssignTablet(mode: TabletMode, tabletIdentifier: string): Observable<boolean> {
    return this.doAssignTabletRpc
      .run({ mode: mode, tabletIdentifier: tabletIdentifier })
      .map(res => {
        return res.isTabletNew;
      });
  }

}
