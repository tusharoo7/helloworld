import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Myaccount } from '../my-account/myaccount.service'
import{PaymentdetailsPage} from '../paymentdetails/paymentdetails';
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
  priviousPaymentHistory : any;
  user = {

  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public myaccountmervice : Myaccount , public helperService :HelperService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentHistoryPage');

    //prayerHistory

    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "donationHistory";
    let  auth_token = this.helperService.getAuth(apiname,api_url);
    this.user["version"] = 1;
    this.user["user_id"] = localStorage.getItem('user_id');
    this.user["auth_token"] = auth_token ;

        this.myaccountmervice.getpaymenthistory(this.user).subscribe((resp) => {
          console.log(resp);

          if (resp.donationHistory.status==1){
           
            this.priviousPaymentHistory = resp.donationHistory.details;
            this.helperService.sendalertmessage('bottom',resp.donationHistory.message);
            
           }
          else if(resp.donationHistory.status==0)
          {
            this.helperService.sendalertmessage('bottom',resp.donationHistory.message);
            
   
          }
         }, (err) => 
         {
           this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
           
        });

         
                  
            
    }
  

    get_paymentdetails(id)
    {
      let jsonData =  JSON.stringify(this.priviousPaymentHistory[id]);
    this.navCtrl.push(PaymentdetailsPage, {clickedData : jsonData});
    }
  }

