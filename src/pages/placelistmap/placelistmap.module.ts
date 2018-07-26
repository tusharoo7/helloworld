import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacelistmapPage } from './placelistmap';

@NgModule({
  declarations: [
    PlacelistmapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacelistmapPage),
  ],
})
export class PlacelistmapPageModule {}
