import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input('data')
  set setData(data) {
    this.data = data;
    if (data == null) {
      this.colInfo = null;
    } else {
      this.colInfo = [];
      for( let field in data[0]){

        this.colInfo.push({Field : field ,  Caption: field.toUpperCase().replace('_',' ')})
      }

    }
  }

  data: Array<any>;
  colInfo: Array<{ Caption: string, Field: string }>;
  rowsPerPageOptions: any[] = [25,30,40];
  constructor() {
  }

  ngOnInit() {
  }

}

