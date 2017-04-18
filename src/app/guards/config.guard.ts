import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingService } from '../providers/setting.service';

@Injectable()
export class ConfigGuard implements CanActivate {

  constructor(private router: Router,
              private settings: SettingService) {
  }

  canActivate() {
    return this.settings.identifier$.map(identifier => {
      if (!identifier || identifier.length === 0) {
        this.router.navigate([ 'mode' ]);
        return false;
      }

      return true;
    });
  }
}
