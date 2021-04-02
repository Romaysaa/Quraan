import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  data: Array<any>;
  colInfo: Array<{ Caption: string, Field: string }>;
  rowsPerPageOptions: any[] = [25, 30, 40];

  constructor() {
  }

  @Input('data')
  set setData(data) {
    let dynamic_cols = JSON.parse(localStorage.getItem('dynamic_cols'));
    this.data = data;
    if (data == null) {
      this.colInfo = null;
    } else {
      this.colInfo = [];
      // for( let field in data[0]){

      if (dynamic_cols) {
        if (dynamic_cols.length > 0) {
          dynamic_cols.forEach(col => {
            this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

          });
        }
      }
      // }

    }
  }

  ngOnInit() {
  }

}

