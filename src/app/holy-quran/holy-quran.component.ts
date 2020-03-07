import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrls: ['./holy-quran.component.scss']
})
export class HolyQuranComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activeAya: number = 0;

  aya_clicked(event, ayaNum) {
    this.activeAya = ayaNum;
    event.preventDefault();
    event.stopPropagation();
  }
}
