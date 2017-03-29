export interface RpcCallResponseModel<TResult> {
  correlationId: number;
  result: TResult;
}
