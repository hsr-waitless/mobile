import { OrderPositionModel } from './order-position.model';
import { OrderStatus } from './order.status';

export interface OrderModel {
  number: number;
  positions: OrderPositionModel[];
  table: string;
  orderStatus: OrderStatus;
  date: Date;
}
