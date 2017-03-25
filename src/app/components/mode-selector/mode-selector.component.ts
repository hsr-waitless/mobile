import { Component } from '@angular/core';
import { SettingService } from '../../providers/setting.service';
import { TabletMode } from '../../models/tablet-mode.enum';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent {

  constructor(private settings: SettingService) { }

  setGuestMode() {
    this.settings.setMode(TabletMode.Guest);
  }

  setChefMode() {
    this.settings.setMode(TabletMode.Chef);
  }

  setWaiterMode() {
    this.settings.setMode(TabletMode.Waiter);
  }
}
