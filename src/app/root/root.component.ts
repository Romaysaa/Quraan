import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Search} from '../holy-quran/search';
import {AutoComplete} from 'primeng';

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
  searchIn = {name: 'بداية الايات', id: 2};
  ayas: any[] = [];
  searchSettings :any;
  searchInput: string;
  showListOfAyah: boolean = false;
  currentLength: number = 0;
  numOfMoade3:number = 0;





  search(event) {
     
    if(event != "oldSearch"){
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
    }}

  }
  fromSora:number;
  toSora:number;

  fromPart:number;
  toPart:number;

  fromHezp:number;
  toHezp:number;

  fromRob:number;
  toRob:number;

  fromPage:number;
  toPage:number;

  fromAya:number;
  toAya:number;
  @ViewChild('autoComplete', {static: false})
  autoComplete: AutoComplete;
  omomQuaanBoolean: boolean;

  getLocal()
  {
    if (this.searchWord==''||this.searchWord==undefined||this.searchWord==null){
      let finalResult = JSON.parse(localStorage.getItem('oldSearch'));
      if(finalResult){
        this.autoComplete.filled = true;
        this.autoComplete.loading = true;
        this.results = [];
        this.results = finalResult;
        this.autoComplete.completeMethod.emit('oldSearch');
      }


    }
  }
  doSearch(){
     this.numOfMoade3 = 0;
    this.saveSearchToLocalStorage();

    // setTimeout(()=>{
    //   this.showListOfAyah = false;
    this.ayas = [];
    let hasSpace = false;
    // if(this.searchWord.toString().endsWith(' ')){
    //   hasSpace = true;
    // }
    // this.searchWord =this.searchWord.split(' ')[0];
    // });

    this.searchSettings = JSON.parse( localStorage.getItem('result'))[0];
    this.fromSora = this.searchSettings.fromSora &&this.searchSettings.fromSora!='.'?parseInt(this.searchSettings.fromSora):null;
    this.toSora = this.searchSettings.toSora&&this.searchSettings.toSora!='.'?parseInt(this.searchSettings.toSora):null;
    this.fromPart = this.searchSettings.fromPart&&this.searchSettings.fromPart!='.'?parseInt(this.searchSettings.fromPart):null;
    this.toPart = this.searchSettings.toPart&&this.searchSettings.toPart!='.'?parseInt(this.searchSettings.toPart):null;
    this.fromHezp = this.searchSettings.fromHezp&&this.searchSettings.fromHezp!='.'?parseInt(this.searchSettings.fromHezp):null;
    this.toHezp = this.searchSettings.toHezp&&this.searchSettings.toHezp!='.'?parseInt(this.searchSettings.toHezp):null;
    this.fromRob = this.searchSettings.fromRob&&this.searchSettings.fromRob!='.'?parseInt(this.searchSettings.fromRob):null;
    this.toRob = this.searchSettings.toRob&&this.searchSettings.toRob!='.'?parseInt(this.searchSettings.toRob):null;
    this.fromPage = this.searchSettings.fromPage&&this.searchSettings.fromPage!='.'?parseInt(this.searchSettings.fromPage):null;
    this.toPage = this.searchSettings.toPage&&this.searchSettings.toPage !='.'?parseInt(this.searchSettings.toPage):null;
    this.fromAya = this.searchSettings.fromAya;
    this.toAya = this.searchSettings.toAya;
    this.omomQuaanBoolean = this.searchSettings.omomQuaanBoolean?this.searchSettings.omomQuaanBoolean:false;
    if(this.hasTashkeel){
      this.searchWithTashkeel();
    }
    else {
      this.searchWithoutTashkeel();
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
     
    this.showListOfAyah = true;
    // });
    // this.showListOfAyah = true;

  }
  highlightSearchWord(aya){ // it works only when search without tashkeel
    let splittdAya;
    let highlightedAya = [];
          splittdAya = aya.AyaText.split(this.searchWord);
         let len=splittdAya.length;
        for(let i=0; i<len;i++)
        {
          if(splittdAya[i]!='') highlightedAya.push({text:splittdAya[i],highlight:false});
          if(i != len-1){
            this.numOfMoade3++
            highlightedAya.push({text:this.searchWord,highlight:true});
          }
        }
    highlightedAya[highlightedAya.length-1].text += ' ('+ aya.Aya_N+')';
    return highlightedAya;
  }




  changeSearchInput(value) {
     
    this.currentLength = value.length;
    this.searchInput = value;
  }

   searchWithTashkeel() {
     
    this._search.table_othmani.forEach(aya=>{
      if(this.fromSora && this.toSora){
        this.searchFromSoraToSora(aya);
      }
      else if(this.fromPart && this.toPart){
        if(aya.nOFJoz>=this.fromPart && aya.nOFJoz<= this.toPart) {

          this.completeSearch(aya);
        }
      }
      else if(this.fromHezp && this.toHezp){
        if(aya.nOFHezb>=this.fromHezp && aya.nOFHezb<= this.toHezp) {

          this.completeSearch(aya);
        }
      }
      else if(this.fromRob && this.toRob){
        if(aya.id>=this.fromRob && aya.id<= this.toRob) {

          this.completeSearch(aya);
        }
      }
      else if(this.fromPage && this.toPage){
        if(aya.nOFPage>=this.fromPage && aya.nOFPage<= this.toPage) {

          this.completeSearch(aya);
        }
      } else {
        this.completeSearch(aya);

      }
    });

  }

   searchWithoutTashkeel() {
     
    this._search.table_othmani.forEach(aya=>{
      if(this.fromSora && this.toSora){
        if(aya.nOFSura>=this.fromSora && aya.nOFSura<= this.toSora) {

          this.completeSearchWithoutTashkeel(aya)
        }
      }
      else if(this.fromPart && this.toPart){
        if(aya.nOFJoz>=this.fromPart && aya.nOFJoz<= this.toPart) {
          this.completeSearchWithoutTashkeel(aya)

        }
      }
      else if(this.fromHezp && this.toHezp){
        if(aya.nOFHezb>=this.fromHezp && aya.nOFHezb<= this.toHezp) {

          this.completeSearchWithoutTashkeel(aya)

        }
      }
      else if(this.fromRob && this.toRob){
        if(aya.id>=this.fromRob && aya.id<= this.toRob) {

          this.completeSearchWithoutTashkeel(aya)

        }
      }
      else if(this.fromPage && this.toPage){
        if(aya.nOFPage>=this.fromPage && aya.nOFPage<= this.toPage) {
          this.completeSearchWithoutTashkeel(aya)

        }
      } else {
        this.completeSearchWithoutTashkeel(aya)

      }
    });

  }

   searchInOmomAlQuran(aya) {
     
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
         الآية: aya.AyaText_Othmani + ' ('+ aya.Aya_N+')',
         AyaText:aya.AyaText,
         highlightedAya:this.highlightSearchWord(aya)
       });
     }

   }

   searchInAyaStart(aya: any) {
     
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
         الآية: aya.AyaText_Othmani + ' ('+ aya.Aya_N+')',
         AyaText:aya.AyaText,
         highlightedAya:this.highlightSearchWord(aya)
       });}

   }

   searchFromSoraToSora(aya) {

     if(aya.nOFSura>=this.fromSora && aya.nOFSura<= this.toSora) {

      if(this.fromPart && this.toPart){
         if(aya.nOFJoz>=this.fromPart && aya.nOFJoz<= this.toPart) {

           this.completeSearch(aya);
         }
       } else {
        this.completeSearch(aya);
      }
       // else if(this.fromHezp && this.toHezp){
       //   if(aya.nOFHezb>=this.fromHezp && aya.nOFHezb<= this.toHezp) {
       //
       //     if (this.omomQuaanBoolean) {
       //       this.searchInOmomAlQuran(aya);
       //     }
       //     else {
       //       this.searchInAyaStart(aya);
       //     }
       //   }
       // }
       // else if(this.fromRob && this.toRob){
       //   if(aya.id>=this.fromRob && aya.id<= this.toRob) {
       //
       //     if (this.omomQuaanBoolean) {
       //       this.searchInOmomAlQuran(aya);
       //     }
       //     else {
       //       this.searchInAyaStart(aya);
       //     }
       //   }
       // }
       // else if(this.fromPage && this.toPage){
       //   if(aya.nOFPage>=this.fromPage && aya.nOFPage<= this.toPage) {
       //
       //     if (this.omomQuaanBoolean) {
       //       this.searchInOmomAlQuran(aya);
       //     }
       //     else {
       //       this.searchInAyaStart(aya);
       //     }
       //   }
       // }






     }

   }

   completeSearch(aya) {
     if (this.omomQuaanBoolean) {
       this.searchInOmomAlQuran(aya);
     } else {
       this.searchInAyaStart(aya);
     }
   }
   completeSearchWithoutTashkeel(aya) {
     if (this.omomQuaanBoolean) {
       this.searchInOmomAlQuranWithoutTashkeel(aya);
     } else {
       this.searchInAyaStartWithoutTashkeel(aya);
     }
   }

   searchInOmomAlQuranWithoutTashkeel(aya: any) {
     if (aya.AyaText.includes(this.searchWord)) {
       //  
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
         الآية: aya.AyaText_Othmani + ' ('+ aya.Aya_N+')',
         AyaText:aya.AyaText,
         highlightedAya:this.highlightSearchWord(aya)
       });
     }
  }

   searchInAyaStartWithoutTashkeel(aya: any) {
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
         الآية: aya.AyaText_Othmani + ' ('+ aya.Aya_N+')',
         AyaText:aya.AyaText,
         highlightedAya:this.highlightSearchWord(aya)
       });
     }
   }

  selectSearchWords($event: any) {
    let word = this.searchWord.replace(new RegExp(String.fromCharCode(1617, 124, 1614, 124, 1611, 124, 1615, 124, 1612, 124, 1616, 124, 1613, 124, 1618,3161,1552 ), "g"), "");
    this.hasTashkeel = word!=this.searchWord;
  }

   saveSearchToLocalStorage() {
     let isSearchFound =false;
     let oldSearch = JSON.parse(localStorage.getItem('oldSearch'));
     if(oldSearch == null){
       oldSearch = [];
     } else {
       for(let i=0;i<oldSearch.length;i++){
         if(oldSearch[i] == this.searchWord){
           isSearchFound = true;
           break;
         }
       }
     }
     if(!isSearchFound){
       oldSearch.push(this.searchWord);
       localStorage.setItem('oldSearch', JSON.stringify(oldSearch));
     }

   }
}
