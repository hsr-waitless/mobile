import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuHubServiceMock {
  getMenus() {
    return Observable.of([]);
  }

  getSubMenus() {
    return Observable.of([]);
  }

  getMenuItems() {
    return Observable.of([]);
  }
}
