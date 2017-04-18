import { Component, OnInit } from '@angular/core';
import { SettingService } from './providers/setting.service';
import { TabletMode } from './models/tablet-mode.enum';
import { Router } from '@angular/router';
import { SignalrService } from './providers/signalr.service';
import { MenuHubService } from './providers/menu-hub.service';
import { TabletHubService } from './providers/tablet-hub.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
              private signalr: SignalrService,
              private tabletHub: TabletHubService,
              private settings: SettingService) {
  }

  ngOnInit() {
    this.signalr.start();

    Observable
      .combineLatest(this.settings.identifier$, this.settings.mode$)
      .subscribe(result => {
        const identifier: string = result[ 0 ];
        const mode: TabletMode = result[ 1 ];

        if (!identifier || identifier.length === 0 || !mode) {
          return;
        }

        this.tabletHub.setMode(mode, identifier).subscribe(() => {

          if (mode === TabletMode.Guest && !this.router.url.startsWith('/guest')) {
            this.router.navigate([ 'guest' ]);
          } else if (mode === TabletMode.Waiter && !this.router.url.startsWith('/waiter')) {
            this.router.navigate([ 'waiter' ]);
          } else if (mode === TabletMode.Chef && !this.router.url.startsWith('/chef')) {
            this.router.navigate([ 'chef' ]);
          }
        });
      });
  }

}
