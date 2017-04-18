import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { RpcExecutor } from './rpc.executor';
import { CommandModel } from './command.model';
import { NgZone } from '@angular/core';

export abstract class SignalrHub {
  private proxy: any;
  private ready: Promise<void>;
  private resolve: Function;
  private events: { [key: string]: any } = {};

  constructor(public name: string, private zone: NgZone) {
    this.ready = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });
  }

  setup(proxy: any): void {
    this.proxy = proxy;
    this.init();
  }

  start() {
    this.resolve();
  }

  abstract init(): void;

  on<TResult>(key: string): Observable<TResult> {
    if (!(key in this.events)) {
      this.events[ key ] = new Subject<TResult>();
      this.proxy.on(key, result => {
        this.zone.run(() => {
          console.log('receive', key, result);
          this.events[ key ].next(result);
        });
      });
    }

    return this.events[ key ].asObservable();
  }

  emit(key: string, ...args: any[]): Promise<any> {
    return this.ready.then(() => {
      console.log('emit', key);
      return this.proxy.invoke(key, ...args).fail(err => {
        console.error(err);
      });
    });
  }

  rpc<TResult>(key: string): RpcExecutor<TResult> {
    return new RpcExecutor<TResult>(
      this.on<CommandModel<TResult>>(`${key}Response`),
      (args) => this.emit(`${key}Request`, args)
    );
  }
}
