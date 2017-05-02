import { MenuItemModel } from './menu.item.model';

export interface OrderPositionModel {
  id: number;
  number: number;
  pricePaidByCustomer: number;
  pricePos: number;
  posStatus: number;
  amount: number;
  item: MenuItemModel;
  comment: string;
}
