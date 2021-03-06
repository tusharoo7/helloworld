import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiService } from '../../services/api/api.service';
import { Termsandcondition } from './termsandcondition.service';
import { HelperService } from '../../services/helper/helper.service';

/**
 * Generated class for the TermsAndConditionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-and-condition',
  templateUrl: 'terms-and-condition.html',
  providers :[HelperService,Termsandcondition,ApiService]
})
export class TermsAndConditionPage {
  cmscontent : any;
  isDataLoaded: any;
  constructor(public terms_service :Termsandcondition ,public helperService : HelperService , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "cmsContent";
   let  auth_token = this.helperService.getAuth(apiname,api_url);
    let cmsparam = {"auth_token" : auth_token , "version" :1 ,"key" :"term" }
    //console.log(loginparam);
    this.terms_service.get_termsdata(cmsparam).subscribe((resp) => {

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
    console.log('ionViewDidLoad TermsAndConditionPage');
  }

}
