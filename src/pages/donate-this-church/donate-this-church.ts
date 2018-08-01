import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the DonateThisChurchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate-this-church',
  templateUrl: 'donate-this-church.html',
  providers: [HelperService,ApiService]
})
export class DonateThisChurchPage {
  locationdata : any;
    userinfo = {
              'name' : '',
              'email' : '',
              'mobile' :''
             }
    amount : number;
    currency :string;   
    placename: string ;     
    payPalEnvironment: string = 'payPalEnvironmentSandbox';
  constructor(private payPal: PayPal,public helperService : HelperService , public navCtrl: NavController, public navParams: NavParams) {
    this.locationdata =   this.navParams.get("placeData");
    this.placename =  this.locationdata.title;
    this.userinfo.name = localStorage.getItem('fname')+""+localStorage.getItem('lname');
    this.userinfo.email = localStorage.getItem('email');
    this.userinfo.mobile = localStorage.getItem('mobile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonateThisChurchPage');
  }
  donatenow()
  {
    if ( this.userinfo.name == undefined || this.userinfo.name == null || this.userinfo.name == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your  Name');
    } 
   
    else if(this.userinfo.email == undefined || this.userinfo.email == null || this.userinfo.email == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your email');
    }
    else if(  !new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$").test(this.userinfo.email)) 
    {
      this.helperService.sendalertmessage('bottom','please enter proper email ');
    }
    else if(this.userinfo.mobile == undefined || this.userinfo.mobile == null || this.userinfo.mobile == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Mobile No');
    }
    else if(this.amount == undefined || this.amount == null  )
    {
      this.helperService.sendalertmessage('bottom','please enter your  amount');
    }
    else
    {
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then(() => {
            // Successfully paid
      
            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }
          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });
    }
  }
}
