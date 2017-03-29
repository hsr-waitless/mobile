import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: 'navigation-item.component.html',
  styleUrls: [ './navigation-item.component.scss' ]
})
export class NavigationItemComponent {

  @Input()
  public text: string;

  @Input()
  public active: boolean;

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click')
  public onClick() {
    this.clicked.emit();
  }
}
