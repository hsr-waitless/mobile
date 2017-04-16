import { Component, Input } from '@angular/core';
import { TableModel } from '../../models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styleUrls: [ './table.component.scss' ]
})
export class TableComponent {

  @Input()
  public table: TableModel;


}

