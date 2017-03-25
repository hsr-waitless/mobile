import { Injectable } from '@angular/core';
import { ConfigService } from '../models/config.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class BrowserConfigService extends ConfigService {

  private keys: { [key: string]: Subject<string> } = {};

  set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);

    if (key in this.keys) {
      this.keys[ key ].next(value);
    }

    return Promise.resolve();
  }

  get(key: string): Observable<string> {
    const subject = new ReplaySubject<string>();
    subject.next(localStorage.getItem(key));
    this.keys[key] = subject;
    return subject;
  }

}
