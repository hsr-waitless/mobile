import { ItemCategory } from './item.category.item';

export interface MenuItemModel {
  id: number;
  title: string;
  description: string;
  image?: string;
  price?: number;
  currency?: string;
  priority?: number;
  order?: number;
  category?: ItemCategory;
}
