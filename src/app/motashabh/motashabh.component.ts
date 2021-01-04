import {Component, OnInit} from '@angular/core';
import {Search} from "../holy-quran/search";
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
  fromSoraAyat: any[] = [];
  toSoraAyat: any[] = [];
  pages: any[] = [];
  result:any[]=[];


  constructor(private _search: Search,private router:Router) { }

  ngOnInit() {
    this.soras.push({اسم_السورة: ".", nOfAyas: 0});
    let currentSura = "الفاتحة";
    let nOfAyas = 0;
    this._search.table_othmani.forEach(aya=>{
      debugger
      if (currentSura == aya.Sura_Name) {
        nOfAyas++;
      } else {
        this.soras.push({
          اسم_السورة: currentSura,
          nOFSura: aya.nOFSura,
          nOfAyas: nOfAyas
        });
        currentSura = aya.Sura_Name;
        nOfAyas = 1;
      }
    });
    this.parts.push({الجزء:"."})
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
    this.hezb.push({nOFHezb:"."})
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
    this.pages.push({
      nOFPage: ".",
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
    this.rob.push({
      rub:".",

    });
    this._search.table_othmani.forEach(aya=>{

      let index =   this.rob.findIndex(sura=>{
        return aya.rub ==sura.rub
      });

      if(index<0) {
        this.rob.push({
          rub: aya.rub,
          ayaId: aya.id,
        });
      }
    });
  }
  omomQuraan:boolean=false;
  omomClicked($event: MouseEvent) {
    this.omomQuraan=true;
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
    this.fromSora=$event.value.nOFSura;

    this.fromSoraAyat = [];
    this.fromSoraAyat.push({
      id: ".",

    });
    let nOfAyas = $event.value.nOfAyas;
    let index = 0;
    while (index < nOfAyas) {
      index++;
      this.fromSoraAyat.push({
        id: index,
      });
    }
  }

  toSoraFun($event: any) {
    debugger
    this.toSora=$event.value.nOFSura;

    if (this.toSora) {
      debugger
      this.parts = [];
      this.hezb = [];
      this.pages = [];
      this.rob = [];

      this.parts.push({الجزء: '.'});
      this.hezb.push({nOFHezb: "."});
      this.rob.push({rub: "."});
      this.pages.push({nOFPage: "."});

      this._search.table_othmani.forEach(aya => {

        if (parseInt(aya.nOFSura) <= parseInt(this.toSora) && parseInt(aya.nOFSura) >= parseInt(this.fromSora)) {
          let index = this.parts.findIndex(sura => {
            return aya.nOFJoz == sura.الجزء
          });

          if (index < 0) {
            this.parts.push({
              الجزء: aya.nOFJoz,

            });
          }

          index = this.hezb.findIndex(sura => {
            return aya.nOFHezb == sura.nOFHezb
          });

          if (index < 0) {
            this.hezb.push({
              nOFHezb: aya.nOFHezb,

            });
          }

          index = this.pages.findIndex(sura => {
            return aya.nOFPage == sura.nOFPage
          });

          if (index < 0) {
            this.pages.push({
              nOFPage: aya.nOFPage,

            });
          }

          index = this.rob.findIndex(sura => {
            return aya.rub == sura.rub
          });

          if (index < 0) {
            this.rob.push({
              rub: aya.rub,
              ayaId: aya.id,
            });
          }

        }

      });
    }
    this.toSoraAyat = [];
    this.toSoraAyat.push({id: "."});
    let nOfAyas = $event.value.nOfAyas;
    let index = 0;
    while (index < nOfAyas) {
      index++;
      this.toSoraAyat.push({
        id: index,
      });
    }
    // this.result.push(this.toSora);

  }

  fromAyaFun($event: any) {
    this.fromAya=$event.value.id;
  }

  toAyaFun($event: any) {
    this.toAya=$event.value.id;
  }
  fromRobFun($event: any) {
    this.fromRob=$event.value.ayaId;
  }

  toRobFun($event: any) {
    this.toRob=$event.value.ayaId;

  }
  fromHezpFun($event: any) {
    debugger
    this.fromHezp=$event.value.nOFHezb;
  }

  toHezpFun($event: any) {
    this.toHezp=$event.value.nOFHezb;
    if (this.toHezp) {
      this._search.table_othmani.forEach(aya => {

        let index = this.hezb.findIndex(sura => {
          return aya.nOFHezb == sura.nOFHezb
        });

        if (index < 0) {
          this.hezb.push({
            nOFHezb: aya.nOFHezb,

          });
        }
      });

    }

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
    this.result.push(
      {"fromSora":this.fromSora,"toSora":this.toSora,
        "fromPart":this.fromPart,"toPart":this.toPart,
        "fromHezp":this.fromHezp,"toHezp":this.toHezp,
        "fromRob":this.fromRob,"toRob":this.toRob,
        "fromPage":this.fromPage,"toPage":this.toPage,
        "fromAya":this.fromAya,"toAya":this.toAya,
        "omomQuaanBoolean":this.omomQuraan
      });

       localStorage.setItem('result',JSON.stringify(this.result));
        let finalResult=  JSON.parse(localStorage.getItem('result'));

        this.router.navigate(['/navbar']);
        alert("تم حفظ الاعدادات ")
  }

  wasatClicked($event: MouseEvent) {
    this.omomQuraan=false;
  }
}
