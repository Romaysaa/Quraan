import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListenRoutingModule } from './listen-routing.module';
import {ListenSettingComponent} from '../listen-setting.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListenSettingComponent],
  imports: [
  CommonModule,FormsModule,
    ListenRoutingModule,InputTextModule,
    DropdownModule
  ]
})
export class ListenModule { }
