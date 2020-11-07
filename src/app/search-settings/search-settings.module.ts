import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchSettingsRoutingModule } from './search-settings-routing.module';
import { SearchSettingsComponent } from './search-settings/search-settings.component';


@NgModule({
  declarations: [SearchSettingsComponent],
  imports: [
    CommonModule,
    SearchSettingsRoutingModule
  ]
})
export class SearchSettingsModule { }
