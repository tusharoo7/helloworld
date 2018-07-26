import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LightCandelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-light-candel',
  templateUrl: 'light-candel.html',
})
export class LightCandelPage {
  picToView:string="assets/imgs/Light_Candle.jpg"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LightCandelPage');
  }

  changeView()
  {
    this.picToView="assets/imgs/animated-candle-gif-22.gif"
  }

}
