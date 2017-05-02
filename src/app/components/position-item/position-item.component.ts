import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderPositionModel } from '../../models/order-position.model';

@Component({
  selector: 'app-position-item',
  templateUrl: './position-item.component.html',
  styleUrls: ['./position-item.component.scss']
})
export class PositionItemComponent {

  @Input()
  public position: OrderPositionModel;

  @Output()
  public amountChanged: EventEmitter<number> = new EventEmitter<number>();

}
