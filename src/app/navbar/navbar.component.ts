import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nOfMotashabeh2: City[];


  selectedMotashabeh2: City;
  showListOfAyah: boolean = false;
  ayas: any[] = [];


  constructor( private http: HttpClient) {
    this.selectedMotashabeh2 = { name: '    0     ', code: '0'};

    this.nOfMotashabeh2 = [
      {name:'عدد المتشابهات', code:'0'},
      { name: '    1     ', code: '1'},
      { name: '    2     ', code: '2'},
      { name: '    3     ', code: '3'},
      { name: '    4     ', code: '4'},
      { name: '    5     ', code: '5'},
      { name: '    6     ', code: '6'},
      { name: '    7     ', code: '7'},
    ];


  }

  imges1: any[] = ["assets/1/3.png","assets/1/4.png"];
  imges2: any[] = ["assets/2/3.png","assets/2/4.png"];
  selectedImage: string = this.imges1[0];
  selectedImage2: string = this.imges1[0];
  selectedClass: string = 'item active';
  i = 0;
  i2 = 0;
  searchInput: string;

  ngOnInit() {
  }
  OnRightClick() {
    this.i++;

    if(this.i <= this.imges1.length-1){
      this.selectedImage = this.imges1[this.i];
    }else {
      this.selectedImage = this.imges1[0];
      this.i = 0;
    }


  }

  OnLeftClick() {
    this.i--;
    if(this.i > 0){
      this.selectedImage = this.imges1[this.i-1];
    }else {
      this.selectedImage = this.imges1[this.imges1.length-1];
      this.i = this.imges1.length;
    }
  }

  OnRightClick2() {
    this.i2++;

    if(this.i2 <= this.imges2.length-1){
      this.selectedImage2 = this.imges2[this.i2];
    }else {
      this.selectedImage2 = this.imges2[0];
      this.i2 = 0;
    }


  }

  OnLeftClick2() {
    this.i2--;
    if(this.i2 > 0){
      this.selectedImage2 = this.imges2[this.i2-1];
    }else {
      this.selectedImage2 = this.imges2[this.imges2.length-1];
      this.i2 = this.imges2.length;
    }
  }

  OnChange(e: any) {
    this.selectedMotashabeh2 = e.value;
  }

  OnSearchClicked() {
    debugger
   while (this.searchInput.includes(' '))
   {
     this.searchInput = this.searchInput.replace(' ','%20');
   }
   let url = 'https://www.alfanous.org/api/search?query=';
    this.http.get<any>(url + '"' + this.searchInput + '"' + '&sortedby=mushaf&range=24').subscribe(res => {
      console.log(res);
      this.ayas = [];
      if(res.search!= null){
        this.showListOfAyah =!!(res.search.ayas);
        for(let i =res.search.interval.start ;i<= res.search.interval.end ; i++){
          debugger
          console.log("<div>" + res.search.ayas[i].aya.text + "</div>");
          let row = "<div  dir=\"rtl\" class=\"result\"><div class=\"row-0\"><span class=\"number\">" + i + "." + res.search.ayas[i].aya.text + "</div></div>";
          // this.ayas.push("<div>"+res.search.ayas[i].aya.text+"</div>");
          this.ayas.push({
            رقم_الصفحة:res.search.ayas[i].position.page,
            // رقم_الربع:res.search.ayas[i].position.rub,
            رقم_الحزب:res.search.ayas[i].position.hizb,
            رقم_الجزء:res.search.ayas[i].position.juz,
            مكان_النزول:res.search.ayas[i].sura.arabic_type,
            رقم_السورة:res.search.ayas[i].identifier.sura_id,
            رقم_الأيه:res.search.ayas[i].identifier.aya_id,
            السورة:res.search.ayas[i].identifier.sura_arabic_name,
            الأيه:res.search.ayas[i].aya.text_no_highlight,
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

  changeSearchInput(value) {
    this.searchInput = value;

  }
}
