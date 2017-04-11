import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaiterComponent } from './pages/waiter/waiter.component';
import { GuestComponent } from './pages/guest/guest.component';
import { ChefComponent } from './pages/chef/chef.component';
import { ModeSelectorComponent } from './pages/mode-selector/mode-selector.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StartupGuard } from './guards/startup.guard';
import { OverviewComponent } from './pages/waiter/overview/overview.component';
import { OrdersComponent } from './pages/waiter/orders/orders.component';
import { CallsComponent } from './pages/waiter/calls/calls.component';
import { DetailComponent } from './pages/waiter/detail/detail.component';

const routes: Routes = [
  {
    path: 'mode',
    component: ModeSelectorComponent
  },
  {
    path: 'waiter',
    component: WaiterComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'calls',
        component: CallsComponent,
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full'
      }
    ],
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
