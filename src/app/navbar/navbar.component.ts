import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

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


  constructor() {
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
}
