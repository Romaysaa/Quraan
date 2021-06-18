import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GridComponent} from "../grid.component";
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [GridComponent],
  exports: [
    GridComponent
  ],
  imports: [
    CommonModule,TableModule
  ]
})
export class GridModule { }
