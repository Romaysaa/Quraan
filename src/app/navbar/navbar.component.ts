
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuranInJson} from "../holy-quran/QuranInJson";
import {QuranPages} from "../holy-quran/QuranPages";
import {Base64} from "js-base64";
import {DialogModule} from 'primeng/dialog';
import {ConfirmationService} from "primeng/api";
// import {ConfirmationService} from "primeng";
import {MenuItem} from 'primeng/api';
import {Search} from "../holy-quran/search";
import {SidebarModule} from 'primeng/sidebar';



interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[QuranInJson,QuranPages,Search]
})
export class NavbarComponent implements OnInit {

  nOfMotashabeh2: City[];


  selectedMotashabeh2: any;
  showListOfAyah: boolean = false;
  ayas: any[] = [];

  audio: any;
  sagdas: any[];
  tafseer: boolean;
  isAudio: boolean;
  isTafser: boolean;

  constructor(private http: HttpClient,
              private confirmationService:ConfirmationService ,
              private _quranInJson: QuranInJson,
              private _quranPages: QuranPages,
              private _search: Search
  ) {
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
  repeat:any[]=[
    {name: 'تكرار الأية', code: '0'},
    {name: 'دون تكرار', code: '1'},
  ]
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

//4,5,6,7,8,9,10,11,77,78,79,80,81,82,83,84,85
  imges: any[] = [77,4,5,6,7,8,9,10,11];  selectedPage: number;

searchSettings :any;

  static ind = 0;
  ngOnInit() {

    this.selectedMotashabeh2 = '7';
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

    let url = 'http://api.alquran.cloud/v1/sajda';
    this.http.get<any>(url ).subscribe(res => {
      console.log(res);
      this.sagdas = [];
      res.data.ayahs.forEach((sagd)=>{
        debugger
        // sagd.surah=sagd.surah.name;
        // sagd.sajda=sagd.sajda.id;
        this.sagdas.push({
          رقم_الصفحة:sagd.page,
          الجزء:sagd.juz,
          اسم_السورة:sagd.surah.name,
          الآية:sagd.text + ' ('+ sagd.numberInSurah +')',
        });
      });
      this.sagdatFlag=true;

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
  OnChangetafseer($event: any) {
    debugger
    this.selectedtafseer=$event;
    // this.tafseer = true;
    // let url = "https://api.alquran.cloud/ayah/1/"+this.selectedtafseer.en;
    // this.http.get<any>(url).subscribe(res => {
    //   this.tafseerText=res.data.text;
    //   console.log(res);
    // });
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
  copyAya:boolean = false;
  share:boolean = false;
  motshabhat: any[]=[];
  onRightAyaClicked($event: any){
    debugger
    this.share = false;
    this.copyAya = false;
    if ($event.item!=null&&$event.item.label==="سماع"){
      if(this.reader!=null&&this.reader!='') {
      this.isAudio=true;
      }
      else{
        alert("اختار القارئ اولا");

      }
    }
    else if($event.item!=null&&$event.item.label==="تفسير"){
      if(this.selectedtafseer!=null)
    {
      this.isTafser=true;
    }else
    alert("اختار التفسير اولا");

   }
    else if($event.item!=null&&$event.item.label==="نسخ"){
      this.copyAya = true;
    }else if($event.item!=null&&$event.item.label==="مشاركة"){
      this.copyAya = true;
      this.share = true;
    }
  }
  onAyaClicked($event: any) {
    debugger
    this.ayaId = $event;
    let options: {} = {responseType: 'audio/mp3'};
    if(this.reader!=null&&this.reader!='') {
      this.isAudio=true;
      this.audio = 'http://cdn.alquran.cloud/media/audio/ayah/' + this.reader + '/' + this.ayaId + '/high';
    }
    if(this.selectedtafseer!=null) {
      this.isTafser=true;
      this.tafseer = true;
debugger
      let url = 'https://api.alquran.cloud/ayah/'+this.ayaId+'/'+this.selectedtafseer.en;
      this.http.get<any>(url).subscribe(res => {
        this.tafseerText=res.data.text;
        debugger
        console.log(res);
      });
    }
    else if(this.copyAya){
     let ayaCopy = this._search.table_othmani[$event-1].AyaText_Othmani + ' (' + this._search.table_othmani[$event-1].Aya_N+')';
     console.log('aya copy: '+ayaCopy);
      let textArea = document.createElement("textarea");
      textArea.value = ayaCopy;
      textArea.style.width = "1px";
      textArea.style.height = "1px";
      document.body.appendChild(textArea);
      textArea.select();
      /* Select the text field */
      // ayaCopy.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
      document.body.removeChild(textArea);

    if(this.share){
      window.open("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse")

    }
    }
  }
  // OntafserClick() {
  //   debugger
  //   this.tafseer = true;
  //   // let url = 'https://api.alquran.cloud/ayah/'+this.ayaId+'/'+this.selectedtafseer.en;
  //   // this.http.get<any>(url).subscribe(res => {
  //   //   this.tafseerText=res.data.text;
  //   //   console.log(res);
  //   // });
  // }
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


  externalMotsh:boolean=false;
  changeMotshabeh() {
    this.externalMotsh=true;
  }
  bottom:any="bottom"
  selectedRepeat:any;
  isRepeat:boolean=false;
  onClickrepeat(event) {
    debugger
    this.selectedRepeat=event.value;
    if(this.selectedRepeat.code==2){
      this.isRepeat=false;
    }else
      this.isRepeat=true;
  }

  onChange(motshabh: City) {
    debugger

    this.selectedMotashabeh2 = motshabh.code;

  }

  onMotahabehClick(ayaId: any) {
    debugger
    for(let i= 0 ;i < this._quranPages.pages.length; i++){
      for(let j=0 ; j< this._quranPages.pages[i].ayas.length;j++){
        if(this._quranPages.pages[i].ayas[j].id == ayaId.toString()){
          this.selectedPage = parseInt(this._quranPages.pages[i].pageNumber);
          console.log("move to page#:"+this.selectedPage  );
          break;
        }

      }
    }
  }

  results: string[];
  searchWord: any;
  hasTashkeel:boolean =false;

  searchInOptions = [
    {name: 'عموم القران', id:1 },
    {name: 'بداية الايات', id: 2},
  ];
  searchIn = this. searchInOptions[0];
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
}
