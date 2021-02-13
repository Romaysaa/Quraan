import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SliderComponent } from './slider/slider.component';
import {HttpClientModule} from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {SlideMenuModule} from 'primeng/slidemenu';
import { RootComponent } from './root/root.component';
import { MotashabhComponent } from './motashabh/motashabh.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ReadersComponent } from './readers/readers.component';
import { QoraaComponent } from './qoraa/qoraa.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {NavbarModule} from "./navbar/navbar/navbar.module";

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    SliderComponent,
    // HolyQuranComponent,
    GridComponent,
    // DynamicAyaComponent,
    RootComponent,
    // MotashabhComponent,
    HomeComponent,
    FooterComponent,
    ReadersComponent,
    // QoraaComponent
  ],
  imports: [
    BrowserModule, SlideMenuModule,
    AppRoutingModule,
    // DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
