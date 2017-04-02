import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: [ './side-panel.component.scss' ],
  animations: [
    trigger('panelState', [
      state('closed', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('open', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class SidePanelComponent implements OnInit {

  private _isVisible: boolean;

  constructor() {
  }

  @HostBinding('class.visible')
  public get isVisible() {
    return this._isVisible;
  }

  @HostListener('click')
  public onClick() {
    this.hide();
  }

  @Input()
  public title: string;

  public get panelState() {
    return this.isVisible ? 'open' : 'closed';
  }

  ngOnInit() {
  }

  public show() {
    this._isVisible = true;
  }

  public hide() {
    this._isVisible = false;
  }
}
