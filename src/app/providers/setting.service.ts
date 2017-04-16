import { Injectable } from '@angular/core';
import { TabletMode } from '../models/tablet-mode.enum';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../models/config.service';
import 'rxjs/add/operator/map';
import { TabletHubService } from './tablet-hub.service';

@Injectable()
export class SettingService {

  private _mode$: Observable<TabletMode>;

  constructor(private config: ConfigService,
              private tabletHub: TabletHubService) {
    this._mode$ = this.config.get('mode').map(value => {
      return parseInt(value, 0);
    });

    this.tabletHub.onAssignedTablet.subscribe(mode => {
      console.log('assign');
      this.setMode(mode);
    });
  }

  public get mode$(): Observable<TabletMode> {
    return this._mode$;
  }

  public setMode(value: TabletMode): Promise<void> {
    return this.config.set('mode', value.toString());
  }
}
