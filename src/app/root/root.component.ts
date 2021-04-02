import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Search} from '../holy-quran/search';

@Component({
  selector: 'app-rootpage',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  providers:[Search]

})
export class RootComponent implements OnInit {

  constructor(private _router:Router,private _search: Search
  ) { }

  ngOnInit() {
  }

  callReader($event: MouseEvent) {
    this._router.navigateByUrl("/qoraa");

  }

  callFehres($event: MouseEvent) {

  }

  callTafser($event: MouseEvent) {
    debugger
    this._router.navigateByUrl("/readers");

  }

  callSearch($event: MouseEvent) {
    this._router.navigateByUrl("/search");

  }

  callMotashabh($event: MouseEvent) {
    this._router.navigateByUrl("/quran");
  }

  callHome($event: MouseEvent) {
    this._router.navigateByUrl("/home");

  }
  results: string[];
  searchWord: any;
  hasTashkeel:boolean =false;

  searchInOptions = [
    {name: 'عموم القران', id:1 },
    {name: 'بداية الايات', id: 2},
  ];
  searchIn = this. searchInOptions[0];
  ayas: any[] = [];
  searchSettings :any;
  searchInput: string;
  showListOfAyah: boolean = false;
  currentLength: number = 0;




  search(event) {
    debugger
    this.searchWord = event.query;
    this.results = [];
    let word = event.query.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618,3161,1552 ), "g"), "");
    if(word!=event.query){
      this.hasTashkeel = true;
      this._search.table_othmani.forEach(aya => {
        if(this.searchIn.id == 1){
          if(aya.AyaText_Othmani.includes(event.query)){
            this.results.push(aya.AyaText_Othmani)
          }
        }else {
          if(aya.AyaText_Othmani.startsWith(event.query)){
            this.results.push(aya.AyaText_Othmani)
          }
        }


      });
    } else{
      this.hasTashkeel = false;
      this._search.table_othmani.forEach(aya => {
        // let text = aya.AyaText_Othmani.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618,3161,1552), "g"), "");

        if(this.searchIn.id == 1){
          if(aya.AyaText.includes(event.query)){
            this.results.push(aya.AyaText_Othmani)
          }
        }else {
          if(aya.AyaText.startsWith(event.query)){
            this.results.push(aya.AyaText_Othmani)
          }
        }

      });
    }

  }

  doSearch(){
    debugger;
    // setTimeout(()=>{
    //   this.showListOfAyah = false;
    this.ayas = [];
    let hasSpace = false;
    if(this.searchWord.toString().endsWith(' ')){
      hasSpace = true;
    }
    this.searchWord =this.searchWord.split(' ')[0];
    // });

    this.searchSettings = JSON.parse( localStorage.getItem('result'))[0];
    let fromSora = this.searchSettings.fromSora &&this.searchSettings.fromSora!='.'?parseInt(this.searchSettings.fromSora):null;
    let toSora = this.searchSettings.toSora&&this.searchSettings.toSora!='.'?parseInt(this.searchSettings.toSora):null;
    let fromPart = this.searchSettings.fromPart&&this.searchSettings.fromPart!='.'?parseInt(this.searchSettings.fromPart):null;
    let toPart = this.searchSettings.toPart&&this.searchSettings.toPart!='.'?parseInt(this.searchSettings.toPart):null;
    let fromHezp = this.searchSettings.fromHezp&&this.searchSettings.fromHezp!='.'?parseInt(this.searchSettings.fromHezp):null;
    let toHezp = this.searchSettings.toHezp&&this.searchSettings.toHezp!='.'?parseInt(this.searchSettings.toHezp):null;
    let fromRob = this.searchSettings.fromRob&&this.searchSettings.fromRob!='.'?parseInt(this.searchSettings.fromRob):null;
    let toRob = this.searchSettings.toRob&&this.searchSettings.toRob!='.'?parseInt(this.searchSettings.toRob):null;
    let fromPage = this.searchSettings.fromPage&&this.searchSettings.fromPage!='.'?parseInt(this.searchSettings.fromPage):null;
    let toPage = this.searchSettings.toPage&&this.searchSettings.toPage !='.'?parseInt(this.searchSettings.toPage):null;
    let fromAya = this.searchSettings.fromAya;
    let toAya = this.searchSettings.toAya;
    let omomQuaanBoolean = this.searchSettings.omomQuaanBoolean?this.searchSettings.omomQuaanBoolean:true;
    if(this.hasTashkeel){
      this._search.table_othmani.forEach(aya=>{
        if(fromSora && toSora){
          if(aya.nOFSura>=fromSora && aya.nOFSura<= toSora) {

            if (omomQuaanBoolean) {
              if (aya.AyaText_Othmani.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText_Othmani.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            }
          }
        }
        else if(fromPart && toPart){
          if(aya.nOFJoz>=fromPart && aya.nOFJoz<= toPart) {

            if (omomQuaanBoolean) {
              if (aya.AyaText_Othmani.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            } else {
              if (aya.AyaText_Othmani.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            }
          }
        }
        else if(fromHezp && toHezp){
          if(aya.nOFHezb>=fromHezp && aya.nOFHezb<= toHezp) {

            if (omomQuaanBoolean) {
              if (aya.AyaText_Othmani.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            } else {
              if (aya.AyaText_Othmani.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            }
          }
        }
        else if(fromRob && toRob){
          if(aya.id>=fromRob && aya.id<= toRob) {

            if (omomQuaanBoolean) {
              if (aya.AyaText_Othmani.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            } else {
              if (aya.AyaText_Othmani.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            }
          }
        }
        else if(fromPage && toPage){
          if(aya.nOFPage>=fromPage && aya.nOFPage<= toPage) {

            if (omomQuaanBoolean) {
              if (aya.AyaText_Othmani.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            } else {
              if (aya.AyaText_Othmani.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });}
            }
          }
        }
      });
    }else {
      // debugger
      this._search.table_othmani.forEach(aya=>{
        if(fromSora && toSora){
          if(aya.nOFSura>=fromSora && aya.nOFSura<= toSora) {

            if (omomQuaanBoolean) {
              // debugger
              if (aya.AyaText.includes(this.searchWord)) {
                // debugger
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            }
          }
        }
        else if(fromPart && toPart){
          if(aya.nOFJoz>=fromPart && aya.nOFJoz<= toPart) {

            if (omomQuaanBoolean) {
              if (aya.AyaText.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            }
          }
        }
        else if(fromHezp && toHezp){
          if(aya.nOFHezb>=fromHezp && aya.nOFHezb<= toHezp) {

            if (omomQuaanBoolean) {
              if (aya.AyaText.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            }
          }
        }
        else if(fromRob && toRob){
          if(aya.id>=fromRob && aya.id<= toRob) {

            if (omomQuaanBoolean) {
              if (aya.AyaText.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            }
          }
        }
        else if(fromPage && toPage){
          if(aya.nOFPage>=fromPage && aya.nOFPage<= toPage) {

            if (omomQuaanBoolean) {
              if (aya.AyaText.includes(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            } else {
              if (aya.AyaText.startsWith(this.searchWord)) {
                this.ayas.push({
                  رقم_السورة: aya.nOFSura,
                  بداية_السورة: aya.suraStart,
                  الربع: aya.rub,
                  الجزء: aya.joz,
                  رقم_الجزء: aya.nOFJoz,
                  الحزب: aya.hezb,
                  رقم_الحزب: aya.nOFHezb,
                  رقم_الصفحة: aya.nOFPage,
                  بداية_الربع: aya.rubStart,
                  بداية_الصفحة: aya.pageStart,
                  اسم_السورة: aya.Sura_Name,
                  الآية: aya.AyaText_Othmani,
                  AyaText:aya.AyaText
                });
              }
            }
          }
        }
      });
    }
    console.log(this.ayas);
    if(hasSpace){
      let ayas = [];
      this.searchWord.toString().replace(' ','');
      this.ayas.forEach(aya=>{
        if(aya.AyaText){
          let arrOfAyaWords = aya.AyaText.split(' ');
          let index = arrOfAyaWords.findIndex(word=>word===this.searchWord);
          if(index>=0){
            ayas.push(aya);
          }
        }

        // for(let i=0;i<arrOfAyaWords.length;i++){
        //   if(arrOfAyaWords.)
        // }

      });
      this.ayas = ayas;

    }
    // setTimeout(()=>{
    debugger
    this.showListOfAyah = true;
    // });
    // this.showListOfAyah = true;

  }

  changeSearchInput(value) {
    debugger
    this.currentLength = value.length;
    this.searchInput = value;
  }

}
