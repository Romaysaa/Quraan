import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuranInJson} from "../holy-quran/QuranInJson";
import {QuranPages} from "../holy-quran/QuranPages";
import {Base64} from "js-base64";
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService} from "primeng/api";
// import {ConfirmationService} from "primeng";
import {MenuItem} from 'primeng/api';



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
  audio: any;
   sagdas: any[];
   tafseer: boolean;

  constructor(private http: HttpClient,private confirmationService:ConfirmationService ,private _quranInJson: QuranInJson, private _quranPages: QuranPages) {
    // this.selectedMotashabeh2 = {name: '    0     ', code: '0'};

    this.nOfMotashabeh2 = [
      {name: 'عدد المتشابهات', code: '0'},
      {name: '    1         ', code: '1'},
      {name: '    2         ', code: '2'},
      {name: '    3         ', code: '3'},
      {name: '    4         ', code: '4'},
      {name: '    5         ', code: '5'},
      {name: '    6         ', code: '6'},
      {name: '    7         ', code: '7'},
    ];

  }
  readers: any[] = [
    {name: 'عبد الباسط مرتل', code: '1', en: 'ar.abdulbasitmurattal'},
    {name: 'مشاري العفاسي', code: '2', en: 'ar.alafasy'},
    {name: 'الحذيفي', code: '3', en: 'ar.hudhaify'},
    {name: 'الحصري مجود', code: '4', en: 'ar.husarymujawwad'},
    {name: 'الشريمي', code: '5', en: 'ar.saoodshuraym'},
    {name: 'الحصري', code: '6', en: 'ar.husary'},
    {name: 'احمد العجمي', code: '7', en: 'ar.ahmedajamy'},
    {name: 'محمد جبريل', code: '8', en: 'ar.muhammadjibreel'},
    {name: 'ابوبكر الشاطري', code: '9', en: 'ar.shaatree'},
    {name: 'المنشاوي', code: '10', en: 'ar.minshawi'},
    {name: 'المنشاوي مجود', code: '11', en: 'ar.minshawimujawwad'},
    {name: 'عبدالله بصفار', code: '12', en: 'ar.abdullahbasfar'},

  ];
  soar: any[] = [
    {name: 'الفاتحه', code: '1'},
    {name: 'البقره', code: '2'},
    {name: 'ال عمران', code: '3', en: 'ar.hudhaify'},
    {name: 'النساء', code: '4', en: 'ar.husarymujawwad'},
    {name: 'المائده', code: '5', en: 'ar.saoodshuraym'},
    {name: 'الانعام', code: '6', en: 'ar.husary'},
    {name: 'الاعراف', code: '7', en: 'ar.ahmedajamy'},
    {name: 'الانفال', code: '8', en: 'ar.muhammadjibreel'},
    {name: 'التوبه', code: '9', en: 'ar.shaatree'},
    {name: 'يونس', code: '10', en: 'ar.minshawi'},
    {name: 'هود', code: '11', en: 'ar.minshawimujawwad'},
    {name: 'يوسف', code: '12', en: 'ar.abdullahbasfar'},

  ];
  // ar.muyassar
  tafser: any[] = [
    // {name: 'تفسير', code: '0', en: "تفسير"},

    {name: 'الميسر', code: '1', en: 'ar.muyassar'},
    {name: 'الجلالين', code: '2', en: 'ar.jalalayn'}]

  selectedReader: any;


  imges1: any[] = ["assets/1/3.png", "assets/1/4.png"];
  imges2: any[] = ["assets/2/3.png", "assets/2/4.png"];
  selectedImage: string = this.imges1[0];
  selectedImage2: string = this.imges1[0];
  selectedClass: string = 'item active';
  i = 0;
  i2 = 0;
  searchInput: string;

  imges: any[] = [4,5,6,7,8,9,10,11];
  selectedPage: number;



 static ind = 0;
  ngOnInit() {
    debugger;
    this.selectedPage = this.imges[0];
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];
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


        }


      }
    }, err => {
      this.showListOfAyah = false;
      console.log(err);
      alert(err.message);
    });
  }
  sagdatFlag:boolean=false;
    OnSgdClicked()
    {
    debugger

      this.sagdatFlag=true;
      let url = 'http://api.alquran.cloud/v1/sajda';
      this.http.get<any>(url ).subscribe(res => {
        console.log(res);
        this.sagdas = [];
        res.data.ayahs.forEach((sagd)=>{
          sagd.surah=sagd.surah.name;
          sagd.sajda=sagd.sajda.id;
          this.sagdas.push(sagd);
        })

      }, err => {
        this.showListOfAyah = false;
        console.log(err);
        alert(err.message);
      });

    }

  currentLength: number = 0;
  prevLength: number = 0;
  foundRes = false;
   reader: string;
  selectedtafseer: any;
  tafseerText: any;

  changeSearchInput(value) {
  debugger
    this.currentLength = value.length;
    this.searchInput = value;
  }

  OnChangeReader($event: any) {
  debugger
    this.selectedReader = $event.en;
    this.reader=$event.en;
    let options: {} = {responseType: 'audio/mp3'};
    this.audio = 'http://cdn.alquran.cloud/media/audio/ayah/'+this.reader+'/'+this.ayaId+'/high';
  }
  // https://api.alquran.cloud/ayah/1/ar.jalalayn
  OnreaderClicked() {

    let options: {} = {responseType: 'audio/mp3'};
    this.audio = 'http://cdn.alquran.cloud/media/audio/ayah/'+this.reader+'/'+this.ayaId+'/high';

  }

  OnayaClicked() {
    debugger
    this.tafseer = true;
    let url = "https://api.alquran.cloud/ayah/1/"+this.selectedtafseer.en;
    this.http.get<any>(url).subscribe(res => {
      console.log(res);
    });
  }

  OnChangetafseer($event: any) {
debugger
    this.selectedtafseer=$event;
    // this.tafseer = true;
    let url = "https://api.alquran.cloud/ayah/1/"+this.selectedtafseer.en;
    this.http.get<any>(url).subscribe(res => {
      this.tafseerText=res.data.text;
      console.log(res);
    });

  }

  GoDisabled(page) {
    this.selectedPage = page;
    // let url = "https://alquran.cloud/ayah?reference=2%3A7";
    // this.http.get<any>(url).subscribe(res => {
    //   console.log(res);
    // });
  }
ayaId:string = '1';
  items: MenuItem[];
  motshabhat: any[]=[];
  onAyaClicked($event: any) {
    debugger
    this.ayaId = $event;

    let options: {} = {responseType: 'audio/mp3'};
   if(this.reader!=null&&this.reader!='') {
     this.audio = 'http://cdn.alquran.cloud/media/audio/ayah/' + this.reader + '/' + this.ayaId + '/high';
   }
   if(this.selectedtafseer!=null)
    { this.tafseer = true;
    let url = 'https://api.alquran.cloud/ayah/'+this.ayaId+'/'+this.selectedtafseer.en;
    this.http.get<any>(url).subscribe(res => {
      this.tafseerText=res.data.text;
      console.log(res);
    });}
  }



  OnRightClick() {
    debugger
    NavbarComponent.ind++;

    if(NavbarComponent.ind <= this.imges.length-1){
      this.selectedPage = this.imges[NavbarComponent.ind];
    }else{
      NavbarComponent.ind--;
    }
  }

  OnLeftClick() {
    debugger;
    NavbarComponent.ind--;
    if(NavbarComponent.ind > 0){
      this.selectedPage = this.imges[NavbarComponent.ind-1];
    } else{
      NavbarComponent.ind++;
    }
  }

  onchange(event) {
    debugger
  }
externalMotsh:boolean=false;
  changeMotshabeh() {
    this.externalMotsh=true;
  }
}
