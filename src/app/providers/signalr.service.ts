import { Inject, Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { HUB_TOKEN } from '../models/signalr-hub.token';
import { SignalrHub } from '../models/signalr-hub';
import { environment } from '../../environments/environment';
import { SignalrWindow } from '../models/signalr.window';
import { ConnectionState } from '../models/connection.state.enum';
import { NotificationService } from './notification.service';

@Injectable()
export class SignalrService {
  private startResolve: Function;

  public started: Promise<void>;

  constructor(private notification: NotificationService,
              private zone: NgZone,
              @Inject(SignalrWindow) private window: SignalrWindow,
              @Inject(HUB_TOKEN) public hubs: SignalrHub[]) {

    this.started = new Promise<void>(resolve => {
      this.startResolve = resolve;
    });
  }

  start() {
    const connection = this.window.$.hubConnection();
    connection.url = `${environment.backendUrl}/signalr`;

    console.log('websocket', 'connect to', connection.url);

    connection.error(err => {
      this.zone.run(() => {
        console.error(err);
        this.notification.showError('server is unavailable');
      });
    });

    connection.stateChanged((change) => {
      this.zone.run(() => {
        console.log('websocket', ConnectionState[ change.newState ]);
        if (change.newState === ConnectionState.Connected) {
          this.notification.clear();
        }
      });
    });

    for (const hub of this.hubs) {
      hub.setup(connection.createHubProxy(hub.name));
    }

    return connection.start().done(() => {
      for (const hub of this.hubs) {
        hub.start();
      }

      this.startResolve();
    });
  }
}
