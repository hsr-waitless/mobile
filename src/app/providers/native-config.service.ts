import { Injectable } from '@angular/core';
import { ConfigService } from '../models/config.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { PlatformService } from './platform.service';

declare const window: any;

@Injectable()
export class NativeConfigService extends ConfigService {

  private keys: { [key: string]: Subject<string> } = {};

  constructor(private platform: PlatformService) {
    super();
    platform.isReady.then(() => {
      this.preferences.watch();
      document.addEventListener('preferencesChanged', (evt: any) => {
        for (const key in this.keys) {
          if (!this.keys.hasOwnProperty(key)) {
            continue;
          }

          this.preferences.fetch(key).then(value => {
            this.keys[ key ].next(value);
          });
        }
      });
    });
  }

  private get preferences() {
    return window.plugins.appPreferences;
  }

  set(key: string, value: string): Promise<void> {
    return this.platform.isReady.then(() => {
      return this.preferences.set(key, value).then(() => {
        if (key in this.keys) {
          this.keys[ key ].next(value);
        }
      });
    });
  }

  get(key: string): Observable<string> {
    const subject = new ReplaySubject<string>();
    this.platform.isReady.then(() => {
      this.preferences.fetch(key).then(value => {
        subject.next(value);
      });
      this.keys[ key ] = subject;
    });
    return subject;
  }

}
