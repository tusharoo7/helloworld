import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PrayerdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-prayerdetails',
  templateUrl: 'prayerdetails.html',
})
export class PrayerdetailsPage {

  prayerInfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.prayerInfo = JSON.parse(this.navParams.get("clickedData"));	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayerdetailsPage');
  }

}
