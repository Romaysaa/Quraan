import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'root', loadChildren: './root/root/root.module#RootModule'},
  {path: 'motsahbh', loadChildren: './motashabh/motashabh/motashabh.module#MotashabhModule'},
  {path: 'home', loadChildren: './home/home/home.module#HomeModule'},
  {path: 'footer', loadChildren: './footer/footer/footer.module#FooterModule'},
  {path: 'readers', loadChildren: './readers/readers/readers.module#ReadersModule'},
  {path: 'qoraa', loadChildren: './qoraa/qoraa/qoraa.module#QoraaModule'},





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
