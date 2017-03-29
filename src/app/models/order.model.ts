import { OrderPositionModel } from './order-position.model';

export interface OrderModel {
  number: number;
  positions: OrderPositionModel[];
  table: string;
  date: Date;
}
