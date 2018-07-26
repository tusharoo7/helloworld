import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelloionicPage } from './helloionic';

@NgModule({
  declarations: [
    HelloionicPage,
  ],
  imports: [
    IonicPageModule.forChild(HelloionicPage),
  ],
})
export class HelloionicPageModule {}
