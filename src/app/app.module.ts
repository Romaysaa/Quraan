import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SliderComponent } from './slider/slider.component';
import { HolyQuranComponent } from './holy-quran/holy-quran.component';
import {HttpClientModule} from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import {TableModule} from 'primeng/table';
import { DynamicAyaComponent } from './dynamic-aya/dynamic-aya.component';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";

import {SlideMenuModule} from 'primeng/slidemenu';
import {MenuModule} from "primeng/menu";
import { RootComponent } from './root/root.component';
import { MotashabhComponent } from './motashabh/motashabh.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ReadersComponent } from './readers/readers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    HolyQuranComponent,
    GridComponent,
    DynamicAyaComponent,
    RootComponent,
    MotashabhComponent,
    HomeComponent,
    FooterComponent,
    ReadersComponent
  ],
  imports: [
    BrowserModule, SlideMenuModule,
    AppRoutingModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule, MenuModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
