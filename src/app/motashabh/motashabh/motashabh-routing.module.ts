import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RootComponent} from "../../root/root.component";
import {MotashabhComponent} from "../motashabh.component";

const routes: Routes = [ {
  path: '',
  component: MotashabhComponent,
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotashabhRoutingModule { }
