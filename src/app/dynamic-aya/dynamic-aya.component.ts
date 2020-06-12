import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  @Input() ayaNumber: String;
  @Input() ayaId: number;
  @Input() href: String;
  @Input() activeAya: any;
  @Input() isActive: boolean;
  @Input() spans: { top: string; left: string; width: string; height: string }[];
  @Input() arrOfColoredWords: { top: string; left: string; width: string;color:string }[];

  // @Input() motashabehatSpans: { isRight: boolean; top: string; name: string,height: string }[];
  @Input() motashabehatSpans: { isRight: boolean;  moade3: string,height: string ,top: string}[];
  // test = [{name: "البقرة (15)", top: "45px", isRight: true,}, {
  //   name: "الرعد (5)",
  //   top: "75px",
  //   isRight: false,
  // }, {name: "الطور (15)", top: "45px", isRight: false,}];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  aya = '';
 
  bakgroundStyle2: { background: string; motashOpacity: number; opacity: number };
  private ayaIsClicked: boolean;
  constructor() { }

  ngOnInit() {
    debugger
    this.ayaIsClicked = false;

  }

  aya_clicked(event, ayaNum) {
    debugger
    this.onClick.emit(this.ayaNumber);
    // this.activeAya = ayaNum;
    // if(this.activeAya == this.href.split('#')[1])
    // this.ayaIsClicked = true;

    this.bakgroundStyle2 = {background:"blue",opacity: .2,motashOpacity:0.2}
    // event.preventDefault();
    // event.stopPropagation();
  }
  bakgroundStyle= {background:"white",opacity: 0.0,motashOpacity:1};
  onMouseEnter($event) {
    // if(!this.ayaIsClicked)
    this.bakgroundStyle = {background:"yellow",opacity: .2,motashOpacity:0.2};
  }

  onMouseOut($event: MouseEvent) {
    // if(!this.ayaIsClicked)
    this.bakgroundStyle = {background:"white",opacity: 0.0,motashOpacity:1};
  }
}
