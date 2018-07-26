import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonateThisChurchPage } from './donate-this-church';

@NgModule({
  declarations: [
    DonateThisChurchPage,
  ],
  imports: [
    IonicPageModule.forChild(DonateThisChurchPage),
  ],
})
export class DonateThisChurchPageModule {}
