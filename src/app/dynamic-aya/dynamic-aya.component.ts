import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  @Input() allMotashabehat: any[];
  @Input() ayaNumber: number;
  @Input() href: any;
  @Input() top: any;
  @Input() left: any;
  @Input() start: any;
  @Input() end: any;
  @Input() activeAya: any;
  @Input() spans: any[];
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  aya = '';
  constructor() { }

  ngOnInit() {
  }

  aya_clicked(event, ayaNum) {
    this.onClick.emit(event);
    this.activeAya = ayaNum;
    // event.preventDefault();
    // event.stopPropagation();
  }
  bakgroundStyle= {background:"white",opacity: 0.0,motashOpacity:1};
  onMouseEnter($event) {
    this.bakgroundStyle = {background:"yellow",opacity: .2,motashOpacity:0.2};
  }

  onMouseOut($event: MouseEvent) {
    this.bakgroundStyle = {background:"white",opacity: 0.0,motashOpacity:1};
  }
}
