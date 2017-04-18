import { Injectable } from '@angular/core';
import { TabletMode } from '../models/tablet-mode.enum';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../models/config.service';
import 'rxjs/add/operator/map';
import { TabletHubService } from './tablet-hub.service';

@Injectable()
export class SettingService {

  private _mode$: Observable<TabletMode>;
  private _identifier$: Observable<string>;

  constructor(private config: ConfigService) {
    this._mode$ = this.config.get('mode').map(value => {
      return parseInt(value, 0);
    });
    this._identifier$ = this.config.get('identifier');
  }

  public get mode$(): Observable<TabletMode> {
    return this._mode$;
  }

  public setMode(value: TabletMode): Promise<void> {
    return this.config.set('mode', value.toString());
  }

  public get identifier$(): Observable<string> {
    return this._identifier$;
  }

  public setIdentifier(value: string): Promise<void> {
    return this.config.set('identifier', value);
  }
}
