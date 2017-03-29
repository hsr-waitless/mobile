import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HUB_TOKEN } from '../models/signalr-hub.token';
import { SignalrHub } from '../models/signalr-hub';
import { environment } from '../../environments/environment';
import { SignalrWindow } from '../models/signalr.window';
import { ConnectionState } from '../models/connection.state.enum';

@Injectable()
export class SignalrProvider {

  constructor(
    @Inject(SignalrWindow) private window: SignalrWindow,
    @Inject(HUB_TOKEN) public hubs: SignalrHub[]) {

  }

  start() {
    const connection = this.window.$.hubConnection();
    connection.url = `${environment.backendUrl}/signalr`;

    console.log('connect to', connection.url);

    connection.error(err => {
      console.error(err);
    });

    connection.stateChanged((change) => {
      console.log(change.newState, ConnectionState[change.newState]);
    });

    for (const hub of this.hubs) {
      hub.setup(connection.createHubProxy(hub.name));
    }

    return connection.start().done(() => {
      for (const hub of this.hubs) {
        hub.connected();
      }
    });
  }
}
