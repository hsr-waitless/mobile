import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { WaiterComponent } from './components/waiter/waiter.component';
import { GuestComponent } from './components/guest/guest.component';
import { ChefComponent } from './components/chef/chef.component';
import { AppComponent } from './app.component';
import { ModeSelectorComponent } from './components/mode-selector/mode-selector.component';
import { SettingService } from './providers/setting.service';
import { PlatformService } from './providers/platform.service';
import { ConfigService } from './models/config.service';
import { NativeConfigService } from './providers/native-config.service';
import { BrowserConfigService } from './providers/browser-config.service';

@NgModule({
  declarations: [
    WaiterComponent,
    GuestComponent,
    ChefComponent,
    AppComponent,
    ModeSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    SettingService,
    PlatformService,
    {
      provide: ConfigService,
      useFactory: configFactory,
      deps: [ PlatformService ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configFactory(platform: PlatformService) {
  if (platform.isCordova) {
    return new NativeConfigService(platform);
  } else {
    return new BrowserConfigService();
  }
}
