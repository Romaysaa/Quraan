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
  // spans = [{top:'50px',left: '45px',width: '392px',height: '35px'},{top:'90px',left: '100px',width: '337px',height: '35px'}];//<span top="top: 50px; left: 45px; width: 392px; height: 35px;"></span>
// <span top="top: 90px; left: 100px; width: 337px; height: 35px;"></span>

  constructor() { }

  ngOnInit() {
  }

  aya_clicked(event, ayaNum) {
    this.onClick.emit(event)
    this.activeAya = ayaNum;
    // event.preventDefault();
    // event.stopPropagation();
  }
}
