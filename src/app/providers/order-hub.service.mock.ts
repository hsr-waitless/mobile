import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderHubServiceMock {
  getTables() {
    return Observable.of([]);
  }

  getOrders() {
    return Observable.of([]);
  }

  getOrder() {
    return Observable.of({});
  }
}
