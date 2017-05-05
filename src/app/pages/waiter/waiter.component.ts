import { Component, OnInit, ViewChild } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { SidePanelComponent } from '../../components/side-panel/side-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: [ './waiter.component.scss' ]
})
export class WaiterComponent implements OnInit {

  public actions: PageAction[];

  @ViewChild('panel')
  public panel: SidePanelComponent;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.actions = [
      { text: 'Bestellungen', args: 'orders' },
      { text: 'Aufrufe', args: 'calls' }
    ];
  }

  selected(page: PageAction) {
    this.router.navigate([ 'waiter', page.args ]);
  }
}
