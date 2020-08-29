import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  static lastTop = 50;
  @Input() ayaNumber: String;
  @Input() ayaId: number;
  @Input() href: String;
  @Input() activeAya: any;
  @Input() isActive: boolean;
  @Input() spans: { top: string; left: string; width: string; height: string }[];
  @Input() arrOfColoredWords: { top: string; left: string; width: string;color:string }[];
  @Input() ayat:[];
  // @Input() motashabehatSpans: { isRight: boolean; top: string; name: string,height: string }[];
  @Input() motashabehatSpans: { isRight: boolean;  moade3: string,height: string ,top: string}[];
  // test = [{name: "البقرة (15)", top: "45px", isRight: true,}, {
  //   name: "الرعد (5)",
  //   top: "75px",
  //   isRight: false,
  // }, {name: "الطور (15)", top: "45px", isRight: false,}];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMotahabehClick: EventEmitter<any> = new EventEmitter<any>();
  @Input()aya = '';
 
  bakgroundStyle2: { background: string; motashOpacity: number; opacity: number };
  private ayaIsClicked: boolean;
  @ViewChild('container', {static: false}) contain: ElementRef;

 listMenuStyle: Object ={
    left: '0px',
    top: '0px',
    position: 'relative',
    'z-index': 200,
    width: '175px',
    height: '60px'
  };

  listMenuItems: any[] = [
    {
      label: 'ذهاب الي الايه', command: (event) => {
        debugger
        this.showList = false;
        this.onMotahabehClick.emit(this.selectedAyaID)
      }

    },
    {
      label: 'عرض الكل', command: (event) => {
        this.showList = false;
        this.OpenDialoge = true;
      }
    }
  ];
  private showList: boolean = false;
  private OpenDialoge: boolean = false;
  selectedAyaID:number;
  constructor() { }

  ngOnInit() {
    debugger
    if(this.motashabehatSpans && this.motashabehatSpans.length>0){
      this.motashabehatSpans.forEach(mot=>{
        if(mot.moade3){
          let arr = mot.moade3.split(' ');
        }
      });
    }
    this.ayaIsClicked = false;

  }

  aya_clicked(event) {
    debugger
    this.onClick.emit(this.ayaId);
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

  onMotashabehRightClick(event, mot: { isRight: boolean; moade3: string; height: string; top: string }) {
    debugger
    event.preventDefault();
    // if (!this.showList) {
      
      this.selectedAyaID = 58;
      this.showList = true;
      // this.OpenDialoge = true;
      let XL = event.clientX - this.contain.nativeElement.getBoundingClientRect().left + this.contain.nativeElement.scrollLeft;
      let YL = event.clientY - this.contain.nativeElement.getBoundingClientRect().top + this.contain.nativeElement.scrollTop;
      this.listMenuStyle['top'] = YL + 'px';
      this.listMenuStyle['left'] = XL + 'px';
    // } else {
    //   this.showList = false;
    // }

  }
}

