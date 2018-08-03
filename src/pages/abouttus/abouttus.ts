import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, } from 'ionic-angular';

import { ApitwoService } from '../../services/api/apitwo.service';
import { Aboutus } from './aboutus.service';
import { HelperService } from '../../services/helper/helper.service';



/**
 * Generated class for the AbouttusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-abouttus',
  templateUrl: 'abouttus.html',
  providers :[HelperService,Aboutus,ApitwoService]
})
export class AbouttusPage {
cmscontent : any;
isDataLoaded: any;
  constructor(public loadingCtrl: LoadingController, public aboutusservice :Aboutus ,public helperService : HelperService , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",      
    });
    loader.present();
    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "cmsContent";
   let  auth_token = this.helperService.getAuth(apiname,api_url);
    let cmsparam = {"auth_token" : auth_token , "version" :1 ,"key" :"about" }
    //console.log(loginparam);
    this.aboutusservice.aboutsus(cmsparam).subscribe((resp) => {
      loader.dismiss();
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
   }

  
}
