import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { SignalrService } from '../providers/signalr.service';

@Injectable()
export class StartupGuard implements CanActivate {

  constructor(private signalr: SignalrService) {}

  canActivate() {
    return this.signalr.started.then(() => true);
  }
}
