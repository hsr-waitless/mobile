import { Component } from '@angular/core';
import { NotificationService } from '../../providers/notification.service';
import { Observable } from 'rxjs/Observable';
import { Toast } from '../../models/toast';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ]
})
export class NotificationComponent {

  constructor(private notification: NotificationService) {
  }

  get toasts$(): Observable<Toast> {
    return this.notification.toasts$;
  }

  clear() {
    this.notification.clear();
  }
}
