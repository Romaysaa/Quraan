import { Component, OnInit } from '@angular/core';
import {Search} from "../holy-quran/search";

@Component({
  selector: 'app-motashabh',
  templateUrl: './motashabh.component.html',
  styleUrls: ['./motashabh.component.scss']
})
export class MotashabhComponent implements OnInit {
  soar: any[] = [
    {name: 'التصنيف', code: '1'},

    {name: 'السور', code: '2'},
    {name: 'الجزء', code: '3'},

  ];

  constructor(private _search: Search) { }

  ngOnInit() {
  }

  omomClicked($event: MouseEvent) {
    
  }
  soraSelected:boolean=false;
  partSelected:boolean=false;

  ayatClicked(event) {
    debugger
    if(event.srcElement.outerText=="السور")
    {
      this.soraSelected=true;
    }else if (event.srcElement.outerText=="الجزء") {
      this.partSelected=true;

    }

  }
}
