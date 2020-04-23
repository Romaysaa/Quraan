import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-dynamic-aya',
  templateUrl: './dynamic-aya.component.html',
  styleUrls: ['./dynamic-aya.component.scss']
})
export class DynamicAyaComponent implements OnInit {
  @Input() ayaNumber: number;
  @Input() href: any;
  @Input() top: any;
  @Input() left: any;
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
}
