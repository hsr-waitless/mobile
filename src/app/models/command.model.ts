export interface CommandModel<TArgument> {
  requestId: string;
  arguments: TArgument;
}
