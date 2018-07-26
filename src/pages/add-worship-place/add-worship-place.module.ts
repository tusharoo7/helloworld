import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWorshipPlacePage } from './add-worship-place';

@NgModule({
  declarations: [
    AddWorshipPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddWorshipPlacePage),
  ],
})
export class AddWorshipPlacePageModule {}
