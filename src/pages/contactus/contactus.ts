import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';

import { ApiService } from '../../services/api/api.service';
import { Contact } from './contactus.service';
import { HelperService } from '../../services/helper/helper.service';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
  providers :[HelperService,Contact,ApiService]
})
export class ContactusPage {
  cmscontent : any;
  isDataLoaded: any;
  constructor(public loadingCtrl: LoadingController, public contact_service :Contact ,public helperService : HelperService , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",      
    });
    loader.present();
    let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
    let api_url = "cmsContent";
   let  auth_token = this.helperService.getAuth(apiname,api_url);
    let cmsparam = {"auth_token" : auth_token , "version" :1 ,"key" :"contact" }
    //console.log(loginparam);
    this.contact_service.get_contactus_data(cmsparam).subscribe((resp) => {

      if (resp.cmsContent.status==1){
        this.isDataLoaded = true;
       this.cmscontent = resp.cmsContent.details.desc;
       loader.dismiss();
       }
      else if(resp.cmsContent.status==0)
      {
        this.helperService.sendalertmessage('bottom',resp.message);
      }
     }, (err) => 
     {
       this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
    });
    console.log('ionViewDidLoad ContactusPage');
  }

}
