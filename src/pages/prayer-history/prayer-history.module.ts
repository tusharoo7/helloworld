import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerHistoryPage } from './prayer-history';

@NgModule({
  declarations: [
    PrayerHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerHistoryPage),
  ],
})
export class PrayerHistoryPageModule {}
