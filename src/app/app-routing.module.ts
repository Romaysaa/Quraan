import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'root', loadChildren: './root/root/root.module#RootModule'},
  {path: 'motsahbh', loadChildren: './motashabh/motashabh/motashabh.module#MotashabhModule'},
  {path: 'home', loadChildren: './home/home/home.module#HomeModule'},
  {path: 'footer', loadChildren: './footer/footer/footer.module#FooterModule'},
  {path: 'readers', loadChildren: './readers/readers/readers.module#ReadersModule'},
  {path: 'qoraa', loadChildren: './qoraa/qoraa/qoraa.module#QoraaModule'},
  {path: 'quran', loadChildren: './navbar/navbar/navbar.module#NavbarModule'},
  {path: 'search', loadChildren: './search-settings/search-settings.module#SearchSettingsModule'},
  {path: 'listen', loadChildren: './listen-setting/listen/listen.module#ListenModule'},





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
