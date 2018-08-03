import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApitwoService } from '../../services/api/apitwo.service';
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
  providers: [HelperService,ApitwoService]
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
  constructor(private apiservice: ApitwoService,private payPal: PayPal,public helperService : HelperService , public navCtrl: NavController, public navParams: NavParams) {
    this.locationdata =   this.navParams.get("placeData");
    this.placename =  this.locationdata.title;
    this.userinfo.name = localStorage.getItem('fname')+" "+localStorage.getItem('lname');
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
        PayPalEnvironmentSandbox: 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(this.amount.toString(), this.currency, "Donate To "+this.placename, 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            alert(`Successfully paid. Status = ${response.response.state}`);
            console.log(response);
          
           let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
           let api_url = "donation";
           let  auth_token = this.helperService.getAuth(apiname,api_url);
    let donation_param = {"auth_token" : auth_token ,
                          "version" :1 ,
                          "user_id" :localStorage.getItem('user_id') ,
                          "worship_place_id":this.locationdata.id,
                          "amount":this.amount,
                          "currency":this.currency,
                          "platform":response.client.platform,
                          "transaction_id":response.response.id
                        }
        this.apiservice.post_genreral(api_url, JSON.stringify(donation_param)).subscribe((resp) => {
          
          if (resp.donation.status==1){
           
            this.helperService.sendalertmessage('bottom',resp.donation.message);
            this.navCtrl.pop();;
           }
          else if(resp.donation.status==0)
          {
            this.helperService.sendalertmessage('bottom',resp.donation.message);
            this.navCtrl.pop();
   
          }
         }, (err) => 
         {
           this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
           this.navCtrl.pop();
        });

    
    
    

          }, () => {
            console.error('Error or render dialog closed without being successful');
            this.helperService.sendalertmessage('bottom',"Error or render dialog closed without being successful!");
            this.navCtrl.pop();
          });
        }, () => {
          console.error('Error in configuration');
          this.helperService.sendalertmessage('bottom',"Error in configuration!");
          this.navCtrl.pop();
        });
      }, () => {
        console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
        this.helperService.sendalertmessage('bottom',"Error in initialization, maybe PayPal isn\'t supported or something else");
        this.navCtrl.pop();
      });
    }
  }
}
