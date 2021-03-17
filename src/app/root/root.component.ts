import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rootpage',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  callReader($event: MouseEvent) {
    this._router.navigateByUrl("/qoraa");

  }

  callFehres($event: MouseEvent) {

  }

  callTafser($event: MouseEvent) {
    debugger
    this._router.navigateByUrl("/readers");

  }

  callSearch($event: MouseEvent) {
    this._router.navigateByUrl("/search");

  }

  callMotashabh($event: MouseEvent) {
    this._router.navigateByUrl("/quran");
  }

  callHome($event: MouseEvent) {
    this._router.navigateByUrl("/home");

  }
}
