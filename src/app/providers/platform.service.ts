import { Injectable } from '@angular/core';

declare const window: any;

@Injectable()
export class PlatformService {

  private ready: Promise<void>;

  constructor() {
    this.ready = new Promise<void>((resolve) => {
      if (this.isCordova) {
        document.addEventListener('deviceready', () => {
          resolve();
        }, false);
      } else {
        resolve();
      }
    });
  }

  public get isReady() {
    return this.ready;
  }

  public get isCordova() {
    return window.cordova !== undefined && window.cordova !== null;
  }
}
