import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchWorshipPage } from './search-worship';

@NgModule({
  declarations: [
    SearchWorshipPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchWorshipPage),
  ],
})
export class SearchWorshipPageModule {}
