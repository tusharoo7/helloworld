import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ApiService } from '../../services/api/api.service';
import { Privacyploicy } from './privacyploicy.service';
import { HelperService } from '../../services/helper/helper.service';

/**
 * Generated class for the PrivacyPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
  providers :[HelperService,Privacyploicy,ApiService]
})
export class PrivacyPolicyPage {
  cmscontent : any;
  isDataLoaded: any;
  constructor(public privacyploicy :Privacyploicy ,public helperService : HelperService ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "cmsContent";
   let  auth_token = this.helperService.getAuth(apiname,api_url);
    let cmsparam = {"auth_token" : auth_token , "version" :1 ,"key" :"privacy" }
    //console.log(loginparam);
    this.privacyploicy.privacypolicidata(cmsparam).subscribe((resp) => {

      if (resp.cmsContent.status==1){
        this.isDataLoaded = true;
       this.cmscontent = resp.cmsContent.details.desc;
       }
      else if(resp.cmsContent.status==0)
      {
        this.helperService.sendalertmessage('bottom',resp.message);
      }
     }, (err) => 
     {
       this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
    });
    console.log('ionViewDidLoad PrivacyPolicyPage');
  }

}
