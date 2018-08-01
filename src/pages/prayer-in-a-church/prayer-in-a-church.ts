import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';

import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import{Prayer} from './prayer.service';

/**
 * Generated class for the PrayerInAChurchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-prayer-in-a-church',
  templateUrl: 'prayer-in-a-church.html',
  providers: [HelperService,ApiService,Prayer]
})
export class PrayerInAChurchPage {
  searchdata :any;
  prayer_content : string ; 
  constructor(public loadingCtrl: LoadingController,public prayer : Prayer ,public navCtrl: NavController, public navParams: NavParams,public helperService :HelperService) {
    this.searchdata =   this.navParams.get("placeData");
    
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("placeData"));
    console.log('ionViewDidLoad PrayerInAChurchPage');
  }

  send_prayer()
  {
    if ( this.prayer_content == undefined || this.prayer_content == null || this.prayer_content == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your prayer');
    } 
    else
    {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();
          
       let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
       let api_url  = "sendAPrayer";
       let  auth_token = this.helperService.getAuth(apiname,api_url);
       
       let payerParam = {"auth_token" : auth_token , "version" :1 ,"user_id" : localStorage.getItem('user_id') ,"worship_place_id" :this.searchdata.id ,  "prayer_message" : this.prayer_content }
      console.log(payerParam);
       this.prayer.sendprayerdata(payerParam).subscribe((resp) => {

      //   // this.navCtrl.push(Myservice);
      //   loading.dismiss();
     // console.log(resp);
     loading.dismiss();
      if(resp.sendAPrayer.status==1)
      {
        this.prayer_content ="";
        this.helperService.sendalertmessage('bottom',resp.sendAPrayer.message);
      }
      else
      {
        
        this.helperService.sendalertmessage('bottom',resp.sendAPrayer.message);
      }
      
           }, (err) => {
         loading.dismiss();
                this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
       });
    }
  }

}
