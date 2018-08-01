import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Myaccount } from '../my-account/myaccount.service'
/**
 * Generated class for the PaymentHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
  providers: [HelperService,ApiService,Myaccount]
})
export class PaymentHistoryPage {
  user = {

  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public myaccountmervice : Myaccount , public helperService :HelperService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentHistoryPage');

    //prayerHistory

    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "prayerHistory";
    let  auth_token = this.helperService.getAuth(apiname,api_url);
    this.user["version"] = 1;
    this.user["user_id"] = localStorage.getItem('user_id');
    this.user["auth_token"] = auth_token ;

        this.myaccountmervice.getpryerhistory(this.user).subscribe((resp) => {
          console.log(resp);

        }, (err) => {
         
                  this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
         });

         
                  
            
    }
  
  }

