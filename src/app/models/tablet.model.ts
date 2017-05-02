import { TabletMode } from './tablet-mode.enum';

export interface TabletModel {
  identifier: string;
  orderId: number;
  mode: TabletMode;
}
