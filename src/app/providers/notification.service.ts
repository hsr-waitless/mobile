import { Injectable } from '@angular/core';
import { Toast } from '../models/toast';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

  private subject: BehaviorSubject<Toast> = new BehaviorSubject<Toast>(null);

  get toasts$() {
    return this.subject.asObservable();
  }

  clear() {
    this.subject.next(null);
  }

  show(toast: Toast) {
    this.subject.next(toast);
  }

  showError(text: string) {
    this.subject.next({ text: text, backgroundColor: '#e74c3c', foregroundColor: 'white' });
    console.log(this.subject.value);
  }
}
