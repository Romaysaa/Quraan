import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExportService} from "./export.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  data: Array<any>;
  defaultCols: Array<string> = ['رقم الصفحة', 'اسم السورة','الآية'];
  colInfo: Array<{ Caption: string, Field: string }>;
  @Output() CloseGrid: EventEmitter<any> = new EventEmitter<any>();
  @Input() numOfMoade3: number;
  @Input() displaySearchResult: boolean = false;
  @Input() rowsInPage: number = 5;
  dataInGrid:any = [];


  constructor(private excelService:ExportService){

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
    this.colInfo.forEach(col=>{
      for (let field in this.data[0]) {
        debugger
      if(field!=col.Field){
        delete this.data[field];
      }
      }
    })
  }

  exportAsXLSX():void {
    debugger
    this.excelService.exportAsExcelFile(this.dataInGrid, 'download');
  }

  exportAsPDF() {
    debugger

    // this.excelService.exportAsPDFFile(this.data, 'download');

  }

  exportAsWord() {
    debugger

    // this.excelService.exportAsWordFile(this.data, 'download');

  }
}

