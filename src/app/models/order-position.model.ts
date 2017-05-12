import { MenuItemModel } from './menu.item.model';
import { OrderPosStatus } from './order.pos.status';

export interface OrderPositionModel {
  id: number;
  number: number;
  pricePaidByCustomer: number;
  pricePos: number;
  posStatus: OrderPosStatus;
  amount: number;
  item: MenuItemModel;
  comment: string;
}
