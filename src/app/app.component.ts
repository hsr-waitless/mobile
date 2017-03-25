import { Component, OnInit } from '@angular/core';
import { SettingService } from './providers/setting.service';
import { TabletMode } from './models/tablet-mode.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private settings: SettingService) {
  }

  ngOnInit() {
    this.settings.mode$.subscribe(mode => {
      if (mode === TabletMode.Guest) {
        this.router.navigate(['guest']);
      } else if (mode === TabletMode.Waiter) {
        this.router.navigate(['waiter']);
      } else if (mode === TabletMode.Chef) {
        this.router.navigate(['chef']);
      } else {
        this.router.navigate(['mode']);
      }
    });
  }

}
