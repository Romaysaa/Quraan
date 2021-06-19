import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  data: Array<any>;
  defaultCols: Array<string> = ['الآية', 'اسم السورة', 'اسم الربع', 'ملاحظات'];
  colInfo: Array<{ Caption: string, Field: string }>;
  @Output() CloseGrid: EventEmitter<any> = new EventEmitter<any>();
  @Input() numOfMoade3: number;
  @Input() displaySearchResult: boolean = false;
  @Input() rowsInPage: number = 5;

  constructor() {
  }

  @Input('data')
  set setData(data) {
    debugger;

    let dynamic_cols = JSON.parse(localStorage.getItem('dynamic_cols'));
    this.data = data;
    if (data == null) {
      this.colInfo = null;
    } else {
      if (this.displaySearchResult) {
        this.colInfo = [];
        if (dynamic_cols) {
          if (dynamic_cols.length > 0) {
            dynamic_cols.forEach(col => {
              this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

            });
          } else {
            this.defaultCols.forEach(col => {
              this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

            });
          }
        } else {
          this.defaultCols.forEach(col => {
            this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

          });
        }

      } else {
        debugger;
        this.colInfo = [];
        for (let field in data[0]) {

          this.colInfo.push({Field: field, Caption: field.toUpperCase().replace('_', ' ')})
        }

      }
    }
  }

  ngOnInit() {
  }

}

