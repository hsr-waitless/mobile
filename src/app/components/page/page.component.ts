import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: [ './page.component.scss' ]
})
export class PageComponent implements OnInit {

  @Input()
  public actions: PageAction[];

  @Output()
  public selectedAction: EventEmitter<PageAction> = new EventEmitter<PageAction>();

  public title = environment.header;

  constructor() {
  }

  ngOnInit() {
    console.log(this.actions);
    if (this.actions && this.actions.length > 0) {
      this.selectedAction.emit(this.actions[ 0 ]);
    }
  }

  ngOnChange() {
    console.log('change', this.actions);
  }

  public selectAction(action: PageAction) {
    this.selectedAction.emit(action);
  }

}
