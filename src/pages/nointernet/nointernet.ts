import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchWorshipPage } from '../search-worship/search-worship';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the NointernetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nointernet',
  templateUrl: 'nointernet.html',
})
export class NointernetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network) {
  	let connectSubscription = this.network.onConnect().subscribe(() => {      
      this.navCtrl.setRoot(SearchWorshipPage);     
    });
  }

  isInternetAvailable(){
  	let connectSubscription = this.network.onConnect().subscribe(() => {
      this.navCtrl.setRoot(SearchWorshipPage);     
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NointernetPage');
  }
}
