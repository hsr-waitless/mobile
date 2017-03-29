import { Component, OnInit } from '@angular/core';
import { PageAction } from '../../models/page.action';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: [ './chef.component.scss' ]
})
export class ChefComponent implements OnInit {

  public pages: PageAction[];
  public orders: OrderModel[];
  public selectedPage: PageAction;

  constructor() {
  }

  ngOnInit() {
    this.pages = [
      { text: 'Offen' },
      { text: 'Aktiv' },
      { text: 'Erledigt' }
    ];

    this.orders = [
      {
        number: 4292,
        date: new Date(),
        table: 'Table 4',
        positions: [
          {
            quantity: 2,
            item: {
              title: 'Grüner Salat',
              description: 'Frische Blattsalate'
            }
          },
          {
            quantity: 1,
            item: {
              title: 'Churrasco de Quadril',
              description: 'Ein geschmackvolles und fettarmes Rumpsteak von mit Pampas–Gras gefütterten Stieren'
            }
          },
          {
            quantity: 1,
            item: {
              title: 'U.S. Bife Ancho',
              description: 'Schön marmoriertes Rib-Eye-Steak vom Hohrücken'
            }
          }
        ]
      }
    ];
  }

  select(action: PageAction) {
    this.selectedPage = action;
  }
}
