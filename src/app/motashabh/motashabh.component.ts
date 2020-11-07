import { Component, OnInit } from '@angular/core';
import {Search} from "../holy-quran/search";
import {QuranInJson} from "../holy-quran/QuranInJson";
import {QuranPages} from "../holy-quran/QuranPages";

@Component({
  selector: 'app-motashabh',
  templateUrl: './motashabh.component.html',
  styleUrls: ['./motashabh.component.scss'],
  providers:[Search]

})
export class MotashabhComponent implements OnInit {
  soar: any[] = [
    {name: 'التصنيف', code: '1'},

    {name: 'السور', code: '2'},
    {name: 'الجزء', code: '3'},

  ];
  soras: any[] = [];

  constructor(private _search: Search) { }

  ngOnInit() {
  }

  omomClicked($event: MouseEvent) {
    
  }
  soraSelected:boolean=false;
  partSelected:boolean=false;
  parts: any[]=[];

  ayatClicked(event) {
    debugger
    if(event.srcElement.outerText=="السور")
    {
      this.soraSelected=true;
      this.partSelected=false;
      this.soras=[];
      this._search.table_othmani.forEach(aya=>{

           let index =   this.soras.findIndex(sura=>{
             return aya.Sura_Name ==sura.اسم_السورة
           });

           if(index<0) {
             this.soras.push({
               اسم_السورة: aya.Sura_Name,          الجزء: aya.joz,

             });
           }
           });



    }
    else if (event.srcElement.outerText=="الجزء") {
      this.partSelected=true;
      this.soraSelected=false;
      this.parts=[];
      this._search.table_othmani.forEach(aya=>{

        let index =   this.parts.findIndex(sura=>{
          return aya.nOFJoz ==sura.الجزء
        });

        if(index<0) {
          this.parts.push({
            الجزء: aya.nOFJoz,

          });
        }
      });
    }

  }
}
