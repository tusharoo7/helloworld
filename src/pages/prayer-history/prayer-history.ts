import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Myaccount } from '../my-account/myaccount.service'

/**
 * Generated class for the PrayerHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prayer-history',
  templateUrl: 'prayer-history.html',
  providers: [HelperService,ApiService,Myaccount]
})
export class PrayerHistoryPage {

  user = {}
  
  priviousPrayerHistory : any;

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
    console.log(this.user);
        this.myaccountmervice.getpryerhistory(this.user).subscribe((resp) => {
          console.log(resp.prayerHistory.details);

          if(resp.prayerHistory.status==1)
          {
           this.helperService.sendalertmessage('bottom',resp.prayerHistory.message);
          // this.priviousPrayerHistory = resp.prayerHistory.details;
          this.priviousPrayerHistory = resp.prayerHistory.details;

          }
          else
          {
            this.priviousPrayerHistory = resp.prayerHistory.details;
            console.log( this.priviousPrayerHistory);
          }
          

        }, (err) => {
         
                  this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
         });

         
                  
            
    }
  
}
