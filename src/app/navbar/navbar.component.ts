import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuranInJson} from "../holy-quran/QuranInJson";
import {QuranPages} from "../holy-quran/QuranPages";

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[QuranInJson,QuranPages]
})
export class NavbarComponent implements OnInit {

  nOfMotashabeh2: City[];


  selectedMotashabeh2: City;
  showListOfAyah: boolean = false;
  ayas: any[] = [];
  ayat: any[] = [];

  quran2 = ["بسم الله الرحمن الرحيم",
    "الحمد لله رب العالمين",
    "الرحمن الرحيم",
    "مالك يوم الدين",
    "إياك نعبد وإياك نستعين",
    "اهدنا الصراط المستقيم",
    "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين"];
  quran = [{
    "index": "1",
    "text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
  },
    {
      "index": "2",
      "text": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"
    },
    {
      "index": "3",
      "text": "الرَّحْمَٰنِ الرَّحِيمِ"
    },
    {
      "index": "4",
      "text": "مَالِكِ يَوْمِ الدِّينِ"
    },
    {
      "index": "5",
      "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
    },
    {
      "index": "6",
      "text": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ"
    },
    {
      "index": "7",
      "text": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    }
    ,
  ];
  allMotashabehat: any[] = [];

  constructor(private http: HttpClient, private _quranInJson: QuranInJson, private _quranPages: QuranPages) {
    this.selectedMotashabeh2 = {name: '    0     ', code: '0'};

    this.nOfMotashabeh2 = [
      {name: 'عدد المتشابهات', code: '0'},
      {name: '    1     ', code: '1'},
      {name: '    2     ', code: '2'},
      {name: '    3     ', code: '3'},
      {name: '    4     ', code: '4'},
      {name: '    5     ', code: '5'},
      {name: '    6     ', code: '6'},
      {name: '    7     ', code: '7'},
    ];

  }

  readers: any[] = [
    {name: 'القراء', code: '0', en: "reader"},

    {name: 'مشاري العفاسي', code: '1', en: 'ar.alafasy'},
    // { name: '    2     ', code: '2'},
    // { name: '    3     ', code: '3'},
    // { name: '    4     ', code: '4'},
    // { name: '    5     ', code: '5'},
    // { name: '    6     ', code: '6'},
    // { name: '    7     ', code: '7'},
  ];
  selectedReader: any;


  imges1: any[] = ["assets/1/3.png", "assets/1/4.png"];
  imges2: any[] = ["assets/2/3.png", "assets/2/4.png"];
  selectedImage: string = this.imges1[0];
  selectedImage2: string = this.imges1[0];
  selectedClass: string = 'item active';
  i = 0;
  i2 = 0;
  searchInput: string;
  x: { text: string, index: string, sura: string, nOfWords: number, lastWord?: String, coloredWord?: String, color?: String, arrOfWords?: { word: String, color: String, nOfChar: number }[] }[] = [];
  arrOfWords: string[] = [];
  arr: { word: String, color: String, nOfChar: number, motashabeh: any[] }[] = [];
  searchWord: string = '';
  firstWord: string = '';

  ngOnInit() {
  debugger;
    // this._quranInJson.suras.forEach(sura=>{
    //   sura.aya.forEach(aya=>{
    //     if(aya.text.startsWith('إِنَّ الَّذِينَ كَفَرُوا')){
    //       this.x.push({sura:sura.name,index:aya.index, text:aya.text})
    //     }
    //   });
    // });
    // debugger;
    // console.log(this.x);
    // console.log(this.x.length);


    this._quranPages.pages[3].ayas.forEach(ayaInPage => {
      this.arrOfWords = ayaInPage.text.split(' ');
      // this.firstWord = this.arrOfWords[0];
      // let i;
      // if (this.firstWord.length > 3) {
      //   i = 1;
      this.searchWord = this.arrOfWords[0];
      //
      // } else {
      //   i = 2;
      //   this.searchWord = this.arrOfWords[0]+ ' ' + this.arrOfWords[1];
      // }
      this.arr = [];

      for (let i = 0; i <= this.arrOfWords.length; i++) {
        this.x = [];
        let countSuras = [];
        if (i == 0) {
          this.searchWord = this.arrOfWords[0];
        } else {
          this.searchWord = this.searchWord + ' ' + this.arrOfWords[i];
        }
        this._quranInJson.suras.forEach(sura => {
          sura.aya.forEach(aya => {
            if (aya.text.startsWith(this.searchWord)) {
              this.x.push({
                text: aya.text,
                index: aya.index,
                sura: sura.name,
                coloredWord: this.arrOfWords[i],
                nOfWords: this.searchWord.split(" ").length,
              });
              if (countSuras.indexOf(sura.name) < 0) {
                countSuras.push(sura.name);
              }
            }
          });
        });//nOfChar:this.searchWord.length}
        if (this.x.length == 1) {
          this.x[this.x.length - 1].lastWord = this.searchWord;
          this.x[this.x.length - 1].color = 'red';
          this.arr.push({
            word: this.arrOfWords[i],
            color: 'red',
            nOfChar: this.arrOfWords[i].length,
            motashabeh: this.x
          });
          // this.x[this.x.length-1].arrOfWords = this.arr;
          this.allMotashabehat.push(this.x);
          console.log('finished:');
          console.log(this.arr);
          break;
        } else if (this.x.length == 2) {
          this.x[this.x.length - 1].lastWord = this.searchWord;
          this.x[this.x.length - 1].color = 'green';
          this.arr.push({
            word: this.arrOfWords[i],
            color: 'green',
            nOfChar: this.arrOfWords[i].length,
            motashabeh: this.x
          });
          // this.x[this.x.length-1].arrOfWords = this.arr;

          this.allMotashabehat.push(this.x);
          console.log('finished:');
          console.log(this.arr);
          break;

        } else if (this.x.length == 3) {
          this.x[this.x.length - 1].lastWord = this.searchWord;
          this.x[this.x.length - 1].color = 'blue';
          this.arr.push({
            word: this.arrOfWords[i],
            color: 'blue',
            nOfChar: this.arrOfWords[i].length,
            motashabeh: this.x
          });
          // this.x[this.x.length-1].arrOfWords = this.arr;

          this.allMotashabehat.push(this.x);
          console.log('finished:');
          console.log(this.arr);
          // break;

        } else if (this.x.length == 4) {
          this.x[this.x.length - 1].lastWord = this.searchWord;
          this.x[this.x.length - 1].color = 'yellow';
          this.arr.push({
            word: this.arrOfWords[i],
            color: 'yellow',
            nOfChar: this.arrOfWords[i].length,
            motashabeh: this.x
          });
          // this.x[this.x.length-1].arrOfWords = this.arr;

          this.allMotashabehat.push(this.x);
          console.log('finished:');
          console.log(this.arr);
          // break;

        } else if (this.x.length > 4) {
          if (countSuras.length <= 6 || this.x.length <= 7) {
            this.x[this.x.length - 1].lastWord = this.searchWord;
            this.x[this.x.length - 1].color = 'burble';
            this.arr.push({
              word: this.arrOfWords[i],
              color: 'burble',
              nOfChar: this.arrOfWords[i].length,
              motashabeh: this.x
            });
            // this.x[this.x.length-1].arrOfWords = this.arr;

            console.log('finished:');
            console.log(this.arr);
            this.allMotashabehat.push(this.x);
            // break;

          } else {
            // this.x[this.x.length-1].color ='burble';
            // this.x[this.x.length-1].arrOfWords.push({word:this.arrOfWords[i],color:'burble',nOfChar:this.arrOfWords[i].length});
            this.arr.push({
              word: this.arrOfWords[i],
              color: 'burble',
              nOfChar: this.arrOfWords[i].length,
              motashabeh: this.x
            });
          }
        } else {
          // this.x[this.x.length-1].color ='burble';
          // this.x[this.x.length-1].arrOfWords.push({word:this.arrOfWords[i],color:'burble',nOfChar:this.arrOfWords[i].length});
          this.arr.push({
            word: this.arrOfWords[i],
            color: 'burble',
            nOfChar: this.arrOfWords[i].length,
            motashabeh: this.x
          });
        }
      }
    });


    // this._quranPages.pages[2].ayas.forEach(ayaInPage=>{
    //   this.x = [];
    //   this.arrOfWords = ayaInPage.text.split(' ');
    //   this.firstWord = this.arrOfWords[0];
    //   // for(let i = 0; i <= this.arrOfWords.length; i++){
    //     if(this.firstWord.length > 5){
    //       this.searchWord = this.searchWord + this.arrOfWords[0];
    //
    //     } else {
    //       this.searchWord = this.arrOfWords[0] + ' ' + this.arrOfWords[1];
    //     }
    //   let countSuras = [];
    //   this._quranInJson.suras.forEach(sura=>{
    //     sura.aya.forEach(aya=>{
    //       if(aya.text.startsWith(this.searchWord)){
    //         this.x.push({text:aya.text,index:aya.index,sura:sura.name});
    //         if(countSuras.indexOf(sura.name)<0){
    //           countSuras.push(sura.name);
    //         }
    //       }
    //     });
    //   });
    //   if(this.x.length==1){
    //
    //   } else if(this.x.length == 2){
    //
    //   }else if(this.x.length == 3){
    //
    //   }else if(this.x.length == 4){
    //
    //   }else if(this.x.length  > 4 ){
    //     if(countSuras.length<=6||this.x.length<=7){
    //       console.log('finished:')
    //       console.log(this.x);
    //
    //     }else{
    //       this.x = [];
    //       countSuras = [];
    //       this.searchWord = this.arrOfWords[0] + ' ' + this.arrOfWords[1]+ ' ' + this.arrOfWords[2];
    //       this._quranInJson.suras.forEach(sura=>{
    //         sura.aya.forEach(aya=>{
    //           if(aya.text.startsWith(this.searchWord)){
    //             this.x.push({text:aya.text,index:aya.index,sura:sura.name});
    //             if(countSuras.indexOf(sura.name)<0){
    //               countSuras.push(sura.name);
    //             }
    //           }
    //         });
    //       });
    //       if(this.x.length==1){
    //
    //       } else if(this.x.length == 2){
    //
    //       }else if(this.x.length == 3){
    //
    //       }else if(this.x.length == 4){
    //
    //       }else if(this.x.length  > 4 ){
    //         if(countSuras.length<=6||this.x.length<=7){
    //           console.log('finished:')
    //           console.log(this.x);
    //
    //         }else{
    //             this.x = [];
    //             countSuras = [];
    //             this.searchWord = this.arrOfWords[0] + ' ' + this.arrOfWords[1]+ ' ' + this.arrOfWords[2]+ ' ' + this.arrOfWords[3];
    //             this._quranInJson.suras.forEach(sura=>{
    //               sura.aya.forEach(aya=>{
    //                 if(aya.text.startsWith(this.searchWord)){
    //                   this.x.push({text:aya.text,index:aya.index,sura:sura.name});
    //                   if(countSuras.indexOf(sura.name)<0){
    //                     countSuras.push(sura.name);
    //                   }
    //                 }
    //               });
    //             });
    //             if(this.x.length==1){
    //
    //             } else if(this.x.length == 2){
    //
    //             }else if(this.x.length == 3){
    //
    //             }else if(this.x.length == 4){
    //
    //             }else if(this.x.length  > 4 ){
    //         }
    //         console.log('countSuras : '+ countSuras);
    //       }
    //     }
    //   }
    //   }
    // });
    this.allMotashabehat.forEach(arr => {
      console.log('allMotashabehat: ' + arr);
    });


  }

  OnRightClick() {
    this.i++;

    if (this.i <= this.imges1.length - 1) {
      this.selectedImage = this.imges1[this.i];
    } else {
      this.selectedImage = this.imges1[0];
      this.i = 0;
    }


  }

  OnLeftClick() {
    this.i--;
    if (this.i > 0) {
      this.selectedImage = this.imges1[this.i - 1];
    } else {
      this.selectedImage = this.imges1[this.imges1.length - 1];
      this.i = this.imges1.length;
    }
  }

  OnRightClick2() {
    this.i2++;

    if (this.i2 <= this.imges2.length - 1) {
      this.selectedImage2 = this.imges2[this.i2];
    } else {
      this.selectedImage2 = this.imges2[0];
      this.i2 = 0;
    }


  }

  OnLeftClick2() {
    this.i2--;
    if (this.i2 > 0) {
      this.selectedImage2 = this.imges2[this.i2 - 1];
    } else {
      this.selectedImage2 = this.imges2[this.imges2.length - 1];
      this.i2 = this.imges2.length;
    }
  }

  OnChange(e: any) {
    this.selectedMotashabeh2 = e.value;
  }

  OnSearchClicked() {
  debugger
    while (this.searchInput.includes(' ')) {
      this.searchInput = this.searchInput.replace(' ', '%20');
    }
    let url = 'https://www.alfanous.org/api/search?query=';
    this.http.get<any>(url + '"' + this.searchInput + '"' + '&sortedby=mushaf&range=all').subscribe(res => {
      console.log(res);
      this.ayas = [];
      if (res.search != null) {
        this.showListOfAyah = !!(res.search.ayas);
        for (let i = res.search.interval.start; i <= res.search.interval.end; i++) {
        debugger
          console.log("<div>" + res.search.ayas[i].aya.text + "</div>");
          let row = "<div  dir=\"rtl\" class=\"result\"><div class=\"row-0\"><span class=\"number\">" + i + "." + res.search.ayas[i].aya.text + "</div></div>";
          // this.ayas.push("<div>"+res.search.ayas[i].aya.text+"</div>");
          this.ayas.push({
            رقم_الصفحة: res.search.ayas[i].position.page,
            // رقم_الربع:res.search.ayas[i].position.rub,
            رقم_الحزب: res.search.ayas[i].position.hizb,
            رقم_الجزء: res.search.ayas[i].position.juz,
            مكان_النزول: res.search.ayas[i].sura.arabic_type,
            رقم_السورة: res.search.ayas[i].identifier.sura_id,
            رقم_الأيه: res.search.ayas[i].identifier.aya_id,
            السورة: res.search.ayas[i].identifier.sura_arabic_name,
            الأيه: res.search.ayas[i].aya.text_no_highlight,
          });
          // document.getElementById('target')[0].["innerHTML"] = this.ayas;


        }


      }
    }, err => {
      this.showListOfAyah = false;
      console.log(err);
      alert(err.message);
    });

  }

  currentLength: number = 0;
  prevLength: number = 0;
  foundRes = false;

  changeSearchInput(value) {
  debugger
    this.currentLength = value.length;
    this.searchInput = value;
    // let url = 'https://www.alfanous.org/api/search?query=';
    // if (this.searchInput.includes(' ') && this.currentLength > this.prevLength && !this.foundRes) {
    //   while (this.searchInput.includes(' ')) {
    //     this.searchInput = this.searchInput.replace(' ', '%20');
    //   }
    //   this.http.get<any>(url + '"' + this.searchInput + '"' + '&sortedby=mushaf&range=all&&page=2').subscribe(res => {
    //     console.log(res);
    //     this.ayas = [];
    //     if (res.search != null) {
    //       this.foundRes = true;
    //       this.showListOfAyah = !!(res.search.ayas);
    //       for (let i = res.search.interval.start; i <= res.search.interval.end; i++) {
    //         debugger
    //         this.ayat.push(res.search.ayas[i].aya.text_no_highlight);
    //         console.log("<div>" + res.search.ayas[i].aya.text + "</div>");
    //         let row = "<div  dir=\"rtl\" class=\"result\"><div class=\"row-0\"><span class=\"number\">" + i + "." + res.search.ayas[i].aya.text + "</div></div>";
    //         this.ayas.push(row);
    //
    //       }
    //
    //
    //     }
    //   }, err => {
    //     this.showListOfAyah = false;
    //     console.log(err);
    //     alert(err.message);
    //   });
    //
    // }


    // this.prevLength = this.currentLength;
    // if (!this.foundRes) {
    //   debugger
    //   let x :any[] = [];
    //   this.suras.forEach((aya) => {
    //     if (aya.text.includes(this.searchInput)){
    //       x.push(aya.text);
    //     }
    //   });
    //    this.quran2.forEach((aya) => {
    //      if(aya.includes(this.searchInput))
    //      {x.push(aya);}
    //   });
    //   console.log(x);
    // }

  }

  OnChangeReader($event: any) {
  debugger
    this.selectedReader = $event.value.en;
  }

  OnreaderClicked() {
    let header = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    // let options: {} = {headers: header};


    // let header
    //   =  res.setHeader('Access-Control-Allow-Origin', '*');
    // let options = new RequestOptions({responseType: ResponseContentType.ArrayBuffer});
    let options: {} = {responseType: 'audio/mpeg'};

    let url = 'http://cdn.alquran.cloud/media/audio/ayah/';
    this.http.get<any[]>(url+this.selectedReader+"/1",options).subscribe(res => {
      debugger
          console.log(res);
    });
  }
}
