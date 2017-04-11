import { Component, OnInit } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: [ './waiter.component.scss' ]
})
export class WaiterComponent implements OnInit {

  public actions: PageAction[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.actions = [
      { text: 'Bestellungen', args: 'orders' },
      { text: 'Aufrufe', args: 'calls' }
    ];
  }

  selected(page: PageAction) {
    this.router.navigate(['waiter', page.args]);
  }
}
