import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LightCandelPage } from './light-candel';

@NgModule({
  declarations: [
    LightCandelPage,
  ],
  imports: [
    IonicPageModule.forChild(LightCandelPage),
  ],
})
export class LightCandelPageModule {}
