import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabletModel } from '../../models/tablet.model';

@Component({
  selector: 'app-tablet-item',
  templateUrl: './tablet-item.component.html',
  styleUrls: ['./tablet-item.component.scss']
})
export class TabletItemComponent {

  @Input()
  public tablet: TabletModel;

  @Output()
  public select: EventEmitter<TabletModel> = new EventEmitter<TabletModel>();

}
