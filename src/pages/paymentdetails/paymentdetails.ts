import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-paymentdetails',
  templateUrl: 'paymentdetails.html',
})
export class PaymentdetailsPage {
  paymentInfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.paymentInfo = JSON.parse(this.navParams.get("clickedData"));	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentdetailsPage');
  }

}
