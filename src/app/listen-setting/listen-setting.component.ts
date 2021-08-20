import { Component, OnInit } from '@angular/core';
import {Search} from '../holy-quran/search';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-listen-setting',
  templateUrl: './listen-setting.component.html',
  styleUrls: ['./listen-setting.component.scss']
})
export class ListenSettingComponent implements OnInit {

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
  result: any[] = [];
  omomQuraan: boolean = false;
  soraSelected: boolean = false;
  partSelected: boolean = false;
  parts: any[] = [];
  fromSora: any = {};
  toSora: any = {};
  fromPart: any = {};
  toPart: any = {};
  fromAya: any = {};
  toAya: any = {};
  fromRob: any = {};
  toRob: any = {};
  fromHezp: any = {};
  toHezp: any = {};
  fromPage: any = {};
  toPage: any = {};
  _search: Search = new Search();
  texts: string[];
  results: string[];

  constructor(private router: Router,private http: HttpClient) {
  }

  ngOnInit() {
    this.parts=[];
    this.texts = [];
    this.soras.push({اسم_السورة: '.', nOfAyas: 0});
    let currentSura = 'الفاتحة';
    let nOfAyas = 0;
    this._search.table_othmani.forEach(aya => {
      if (currentSura == aya.Sura_Name) {
        nOfAyas++;
      } else {
        this.soras.push({
          اسم_السورة: currentSura,
          nOFSura: (parseInt(aya.nOFSura) - 1).toString(),
          nOfAyas: nOfAyas
        });
        currentSura = aya.Sura_Name;
        nOfAyas = 1;
      }
    });
    this.parts.push({الجزء: '.'});
    this._search.table_othmani.forEach(aya => {

      let index = this.parts.findIndex(sura => {
        return aya.nOFJoz == sura.الجزء;
      });

      if (index < 0) {
        this.parts.push({
          الجزء: aya.nOFJoz,

        });
      }
    });
    this.hezb.push({nOFHezb: '.'});
    this._search.table_othmani.forEach(aya => {

      let index = this.hezb.findIndex(sura => {
        return aya.nOFHezb == sura.nOFHezb;
      });

      if (index < 0) {
        this.hezb.push({
          nOFHezb: aya.nOFHezb,

        });
      }
    });
    this.pages.push({
      nOFPage: '.',
    });
    this._search.table_othmani.forEach(aya => {

      let index = this.pages.findIndex(sura => {
        return aya.nOFPage == sura.nOFPage;
      });

      if (index < 0) {
        this.pages.push({
          nOFPage: aya.nOFPage,

        });
      }
    });
    this.rob.push({
      rub: '.',

    });
    this._search.table_othmani.forEach(aya => {

      let index = this.rob.findIndex(sura => {
        return aya.rub == sura.rub;
      });

      if (index < 0) {
        this.rob.push({
          rub: aya.rub,
          ayaId: aya.id,
        });
      }
    });
    this.fromSoraAyat = [];
    this.toSoraAyat = [];
    this.toSoraAyat.push({id: '.'});
    this.fromSoraAyat.push({id: '.'});
  }

  omomClicked($event: MouseEvent) {
    this.omomQuraan = true;
  }
  ayaId =5;
  roow:any;
  audioCount:number ;

  fromSoraFun($event: any) {
    debugger
    this.parts=[];
    // this.audio = 'http://cdn.alquran.cloud/media/audio/surah/' + "ar.alafasy"+ '/' + this.ayaId + '';
    let url ="http://api.alquran.cloud/v1/surah/"+$event.value.nOFSura;
    // http://api.alquran.cloud/v1/juz/2
    this.http.get<any>(url  ).subscribe(res => {
      this.audioCount = res.data.ayahs.length;
      res.data.ayahs.forEach((aya)=>{
         this.roow='http://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/'+ aya.number;
        this.parts.push(this.roow );
        console.log(res);
      });
    });

  }

  audioEnded(ayaNum){
    debugger
    if(ayaNum<this.audioCount-1)
    this.playNextAya(ayaNum+1);
  }

  playNextAya(ayaNum){
    var aud = document.getElementById("surahPlayer"+ayaNum);
    aud.play();
  }

  toSoraFun($event: any) {
    this.toSora = $event.value.nOFSura;

    if (this.toSora) {
      this.parts = [];
      this.hezb = [];
      this.pages = [];
      this.rob = [];
      this.toSoraAyat = [];


      this.parts.push({الجزء: '.'});
      this.hezb.push({nOFHezb: '.'});
      this.rob.push({rub: '.'});
      this.pages.push({nOFPage: '.'});
      this.toSoraAyat.push({id: '.'});

      this._search.table_othmani.forEach(aya => {

        if (parseInt(aya.nOFSura) <= parseInt(this.toSora) && parseInt(aya.nOFSura) >= parseInt(this.fromSora)) {
          let index = this.parts.findIndex(sura => {
            return aya.nOFJoz == sura.الجزء;
          });

          if (index < 0) {
            this.parts.push({
              الجزء: aya.nOFJoz,

            });
          }

          index = this.hezb.findIndex(sura => {
            return aya.nOFHezb == sura.nOFHezb;
          });

          if (index < 0) {
            this.hezb.push({
              nOFHezb: aya.nOFHezb,

            });
          }

          index = this.pages.findIndex(sura => {
            return aya.nOFPage == sura.nOFPage;
          });

          if (index < 0) {
            this.pages.push({
              nOFPage: aya.nOFPage,

            });
          }

          index = this.rob.findIndex(sura => {
            return aya.rub == sura.rub;
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
    this.fromAya = $event.value.id;
  }

  toAyaFun($event: any) {
    this.toAya = $event.value.id;
  }

  fromRobFun($event: any) {
    this.fromRob = $event.value.ayaId;
  }

  toRobFun($event: any) {
    this.toRob = $event.value.ayaId;

  }

  fromHezpFun($event: any) {
    this.fromHezp = $event.value.nOFHezb;
  }

  toHezpFun($event: any) {
    this.toHezp = $event.value.nOFHezb;
    if (this.toHezp) {
      this._search.table_othmani.forEach(aya => {

        let index = this.hezb.findIndex(sura => {
          return aya.nOFHezb == sura.nOFHezb;
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
    this.fromPage = $event.value.nOFPage;
  }

  toPageFun($event: any) {
    this.toPage = $event.value.nOFPage;
  }

  fromPartFun($event: any) {
    this.fromPart = $event.value.الجزء;
  }

  toPartFun($event: any) {
    this.toPart = $event.value.الجزء;
  }
  // https://alquran.cloud/surah/2
  // https://alquran.cloud/ayah
  // https://alquran.cloud/juz/1
  audio: any;
  saveSearch() {
    this.result.push(
      {
        'fromSora': this.fromSora, 'toSora': this.toSora,
        'fromPart': this.fromPart, 'toPart': this.toPart,
        'fromHezp': this.fromHezp, 'toHezp': this.toHezp,
        'fromRob': this.fromRob, 'toRob': this.toRob,
        'fromPage': this.fromPage, 'toPage': this.toPage,
        'fromAya': this.fromAya, 'toAya': this.toAya,
        'omomQuaanBoolean': this.omomQuraan,
      });

    localStorage.setItem('result', JSON.stringify(this.result));
    localStorage.setItem('dynamic_cols', JSON.stringify(this.texts));

    this.router.navigate(['/navbar']);
    alert('تم حفظ الاعدادات ');
  }

  wasatClicked($event: MouseEvent) {
    this.omomQuraan = false;
  }

  search1(event) {
    this.results = [];
    this.results.push('رقم_السورة');
    this.results.push('بداية_السورة');
    this.results.push('الربع');
    this.results.push('الجزء');
    this.results.push('رقم_الجزء');
    this.results.push('الحزب');
    this.results.push('رقم_الحزب');
    this.results.push('رقم_الصفحة');
    this.results.push('بداية_الربع');
    this.results.push('بداية_الصفحة');
    this.results.push('اسم_السورة');
    this.results.push('الآية');
  }

  onChange($event: any) {

    this.texts.push($event);
  }
}
