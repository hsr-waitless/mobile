import { Observable } from 'rxjs/Observable';
import { CommandModel } from './command.model';
import 'rxjs/add/operator/filter';

export class RpcExecutor<TResult> {

  constructor(private result: Observable<CommandModel<TResult>>,
              private exec: (args: any) => any) {
  }

  run(args: any): Observable<TResult> {
    const req: CommandModel<any> = {
      requestId: 'abc',
      arguments: args
    };

    const observable = this.result
      .filter(res => {
        return res.requestId === req.requestId;
      })
      .map(res => {
        return res.arguments;
      });

    this.exec(req);

    return observable;
  }
}
