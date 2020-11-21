import { Component, OnInit } from '@angular/core';
import {Search} from "../holy-quran/search";
import {QuranInJson} from "../holy-quran/QuranInJson";
import {QuranPages} from "../holy-quran/QuranPages";
import {Router} from "@angular/router";

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
  rob: any[] = [];
  hezb: any[] = [];
  ayat: any[] = [];
  pages: any[] = [];
  result:any[]=[];


  constructor(private _search: Search,private router:Router) { }

  ngOnInit() {
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
    this._search.table_othmani.forEach(aya=>{

      let index =   this.hezb.findIndex(sura=>{
        return aya.nOFHezb ==sura.nOFHezb
      });

      if(index<0) {
        this.hezb.push({
          nOFHezb: aya.nOFHezb,

        });
      }
    });

    this._search.table_othmani.forEach(aya=>{

      let index =   this.pages.findIndex(sura=>{
        return aya.nOFPage ==sura.nOFPage
      });

      if(index<0) {
        this.pages.push({
          nOFPage: aya.nOFPage,

        });
      }
    });
    this._search.table_othmani.forEach(aya=>{

      let index =   this.ayat.findIndex(sura=>{
        return aya.id ==sura.id
      });

      if(index<0) {
        this.ayat.push({
          id: aya.id,

        });
      }
    });

    this._search.table_othmani.forEach(aya=>{

      let index =   this.rob.findIndex(sura=>{
        return aya.rub ==sura.rub
      });

      if(index<0) {
        this.rob.push({
          rub: aya.rub,

        });
      }
    });
  }

  omomClicked($event: MouseEvent) {
    
  }
  soraSelected:boolean=false;
  partSelected:boolean=false;
  parts: any[]=[];
  fromSora: any={};
  toSora: any={};
  fromPart: any={};
  toPart: any={};
  fromAya: any={};
  toAya: any={};
  fromRob: any={};
  toRob: any={};
  fromHezp: any={};
  toHezp: any={};
  fromPage: any={};
  toPage: any={};

  // ayatClicked(event) {
  //   debugger
  //   if(event.srcElement.outerText=="السور")
  //   {
  //     this.soraSelected=true;
  //     this.partSelected=false;
  //     this.soras=[];
  //     this._search.table_othmani.forEach(aya=>{
  //
  //          let index =   this.soras.findIndex(sura=>{
  //            return aya.Sura_Name ==sura.اسم_السورة
  //          });
  //
  //          if(index<0) {
  //            this.soras.push({
  //              اسم_السورة: aya.Sura_Name,          الجزء: aya.joz,
  //
  //            });
  //          }
  //          });
  //
  //
  //
  //   }
  //   else if (event.srcElement.outerText=="الجزء") {
  //     this.partSelected=true;
  //     this.soraSelected=false;
  //     this.parts=[];
  //     this._search.table_othmani.forEach(aya=>{
  //
  //       let index =   this.parts.findIndex(sura=>{
  //         return aya.nOFJoz ==sura.الجزء
  //       });
  //
  //       if(index<0) {
  //         this.parts.push({
  //           الجزء: aya.nOFJoz,
  //
  //         });
  //       }
  //     });
  //   }
  //
  // }



  fromSoraFun($event: any) {
    debugger
    this.fromSora=$event.value.اسم_السورة;
    this.result.push(this.fromSora);
  }

  toSoraFun($event: any) {
    this.toSora=$event.value.اسم_السورة;
    this.result.push(this.toSora);

  }

  fromAyaFun($event: any) {
    this.fromAya=$event.value.id;
  }

  toAyaFun($event: any) {
    this.toAya=$event.value.id;
  }
  fromRobFun($event: any) {
    this.fromRob=$event.value.rub;
  }

  toRobFun($event: any) {
    this.toRob=$event.value.rub;

  }
  fromHezpFun($event: any) {
    debugger
    this.fromHezp=$event.value.nOFHezb;
  }

  toHezpFun($event: any) {
    this.toHezp=$event.value.nOFHezb;
  }
  fromPageFun($event: any) {
    this.fromPage=$event.value.nOFPage;
  }

  toPageFun($event: any) {
    this.toPage=$event.value.nOFPage;
  }
  fromPartFun($event: any) {
    this.fromPart=$event.value.الجزء;
  }

  toPartFun($event: any) {
    this.toPart=$event.value.الجزء;
  }

  saveSearch() {
    debugger
    this.result.push({"from sora":this.fromSora},{"fromHezp":this.fromHezp},
      {"fromRob":this.fromRob},{"fromPart":this.fromPart},{"fromPage":this.fromPage},{"fromAya":this.fromAya},
      {"toHezp":this.toHezp},{"toRob":this.toRob},{"toAya":this.toAya},{"toPart":this.toPart},
      {"toSora":this.toSora},{"toPage":this.toPage});

       localStorage.setItem('result',JSON.stringify(this.result));
        let finalResult=  JSON.parse(localStorage.getItem('result'));

        this.router.navigate(['/navbar']);
        alert("تم حفظ الاعدادات ")
  }

}
