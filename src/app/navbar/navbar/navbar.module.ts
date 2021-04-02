import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import {HolyQuranComponent} from '../../holy-quran/holy-quran.component';
import {NavbarComponent} from '../navbar.component';
import {DynamicAyaComponent} from '../../dynamic-aya/dynamic-aya.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';
// import {AppModule} from '../../app.module';


@NgModule({
  declarations: [HolyQuranComponent, NavbarComponent,DynamicAyaComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    DropdownModule,
    FormsModule,
    MenuModule,
    DialogModule
    
    // AppModule
  ]
})
export class NavbarModule { }
