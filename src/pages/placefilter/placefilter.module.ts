import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacefilterPage } from './placefilter';

@NgModule({
  declarations: [
    PlacefilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacefilterPage),
  ],
})
export class PlacefilterPageModule {}
