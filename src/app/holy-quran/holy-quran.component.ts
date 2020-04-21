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
inputs = [{top: '150px',href:'#17',activeAya:'17',spans:[{top:'50px',left: '45px',width: '392px',height: '35px'},{top:'90px',left: '100px',width: '337px',height: '35px'}]},{top: '550px',href:'#18',activeAya:'18',spans:[{top:'90px',left: '45px',width: '40px',height: '35px'},{top:'130px',left: '265px',width: '172px',height: '35px'}]}];

}
