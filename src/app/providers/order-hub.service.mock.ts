import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderHubServiceMock {
  get reload$() {
    return Observable.of();
  }

  getTables() {
    return Observable.of([]);
  }

  getOrders() {
    return Observable.of([]);
  }

  getOrder() {
    return Observable.of({});
  }

  getOrdersByStatus() {
    return Observable.of([]);
  }
}
