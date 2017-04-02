import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { GuestComponent } from './pages/guest/guest.component';
import { ChefComponent } from './pages/chef/chef.component';
import { AppComponent } from './app.component';
import { ModeSelectorComponent } from './pages/mode-selector/mode-selector.component';
import { SettingService } from './providers/setting.service';
import { PlatformService } from './providers/platform.service';
import { ConfigService } from './models/config.service';
import { NativeConfigService } from './providers/native-config.service';
import { BrowserConfigService } from './providers/browser-config.service';
import { SignalrService } from './providers/signalr.service';
import { MenuHubProvider } from './providers/menu-hub-provider';
import { HUB_TOKEN } from './models/signalr-hub.token';
import { SignalrWindow } from './models/signalr.window';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { SubMenuItemComponent } from './components/sub-menu-item/sub-menu-item.component';
import { PricePipe } from './pipes/price-pipe';
import { PageComponent } from './components/page/page.component';
import { StartupGuard } from './guards/startup.guard';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    WaiterComponent,
    GuestComponent,
    ChefComponent,
    AppComponent,
    ListItemComponent,
    MenuItemComponent,
    NavigationBarComponent,
    NavigationItemComponent,
    SubMenuItemComponent,
    ModeSelectorComponent,
    PricePipe,
    PageComponent,
    SidePanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    SettingService,
    SignalrService,
    PlatformService,
    MenuHubProvider,
    StartupGuard,
    { provide: SignalrWindow, useFactory: signalrWindowFactory },
    { provide: HUB_TOKEN, useFactory: menuHubFactory, deps: [MenuHubProvider], multi: true },
    {
      provide: ConfigService,
      useFactory: configFactory,
      deps: [ PlatformService ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function signalrWindowFactory(): any {
  return window;
}

export function menuHubFactory(menuHub: MenuHubProvider) {
  return menuHub;
}

export function configFactory(platform: PlatformService) {
  if (platform.isCordova) {
    return new NativeConfigService(platform);
  } else {
    return new BrowserConfigService();
  }
}
