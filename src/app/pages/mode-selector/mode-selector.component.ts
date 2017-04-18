import { Component } from '@angular/core';
import { SettingService } from '../../providers/setting.service';
import { TabletMode } from '../../models/tablet-mode.enum';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: [ './mode-selector.component.scss' ]
})
export class ModeSelectorComponent {

  public tabletIdentifier: string;

  constructor(private settings: SettingService) {
    this.settings.identifier$.subscribe(res => {
      this.tabletIdentifier = res;
    });
  }

  setGuestMode() {
    this.settings.setIdentifier(this.tabletIdentifier);
    this.settings.setMode(TabletMode.Guest);
  }

  setChefMode() {
    this.settings.setIdentifier(this.tabletIdentifier);
    this.settings.setMode(TabletMode.Chef);
  }

  setWaiterMode() {
    this.settings.setIdentifier(this.tabletIdentifier);
    this.settings.setMode(TabletMode.Waiter);
  }
}
