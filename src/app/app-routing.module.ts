import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { GuestComponent } from './pages/guest/guest.component';
import { ChefComponent } from './pages/chef/chef.component';
import { ModeSelectorComponent } from './pages/mode-selector/mode-selector.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StartupGuard } from './guards/startup.guard';

const routes: Routes = [
  {
    path: 'mode',
    component: ModeSelectorComponent
  },
  {
    path: 'waiter',
    component: WaiterComponent,
    canActivate: [
      StartupGuard
    ]
  },
  {
    path: 'guest',
    component: GuestComponent,
    canActivate: [
      StartupGuard
    ]
  },
  {
    path: 'chef',
    component: ChefComponent,
    canActivate: [
      StartupGuard
    ]
  },
  {
    path: '',
    redirectTo: '/mode',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
