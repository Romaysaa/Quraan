import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  @Input() allMotashabehat: any[];
  @Input() ayaNumber: number;
  @Input() href: String;
  @Input() top: any;
  @Input() left: any;
  @Input() start: any;
  @Input() end: any;
  @Input() activeAya: any;
  @Input() isActive: boolean;
  @Input() spans: any[];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  aya = '';
 
  bakgroundStyle2: { background: string; motashOpacity: number; opacity: number };
  private ayaIsClicked: boolean;
  constructor() { }

  ngOnInit() {
    this.ayaIsClicked = false;
  }

  aya_clicked(event, ayaNum) {
    debugger
    this.onClick.emit(event);
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
