import { Observable } from 'rxjs/Observable';
import { RpcCallRequestModel } from './rpc-call-request.model';
import { RpcCallResponseModel } from './rpc-call-response.model';
import 'rxjs/add/observable/of';

export class RpcExecutor<TResult> {

  constructor(private result: Observable<RpcCallResponseModel<TResult>>,
              private exec: (...args: any[]) => any) {
  }

  run(...args: any[]): Observable<TResult> {
    /*const call: RpcCallRequestModel = {

    };
    this.exec(...args);*/
    return Observable.of(null);
  }
}
