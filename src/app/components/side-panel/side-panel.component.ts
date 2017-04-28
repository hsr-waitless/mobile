import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: [ './side-panel.component.scss' ],
  animations: [
    trigger('panelState', [
      state('closed', style({
        transform: 'translate(400px, 0)'
      })),
      state('open', style({
        transform: 'translate(0, 0)'
      })),
      transition('open => closed', animate('400ms ease-in')),
      transition('closed => open', animate('400ms ease-out'))
    ])
  ]
})
export class SidePanelComponent {

  private _isVisible: boolean;

  @Input()
  public title: string;

  @Input()
  public header: string;

  @Input()
  public width = 400;

  @HostBinding('class.visible')
  public get isVisible() {
    return this._isVisible;
  }

  @HostListener('click')
  public onClick() {
    this.hide();
  }

  public get panelState() {
    return this.isVisible ? 'open' : 'closed';
  }

  public show() {
    this._isVisible = true;
  }

  public hide() {
    this._isVisible = false;
  }
}
