import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Myaccount } from './myaccount.service'
import {ChangepasswordPage} from '../changepassword/changepassword';
/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
 providers: [HelperService,ApiService,Myaccount]
})
export class MyAccountPage {
  user = {
    fname : '',
    lname : '',
    email : '',
    isd : '',
    mobile : ''
}
  
  constructor(public myaccountmervice : Myaccount ,public navCtrl: NavController, public navParams: NavParams,public helperService :HelperService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

      
       this.user.fname =  localStorage.getItem('fname');
       this.user.lname =  localStorage.getItem('lname');
       this.user.email =  localStorage.getItem('email');
       this.user.mobile = localStorage.getItem('mobile');
       this.user.isd =  localStorage.getItem('isd');
    console.log('ionViewDidLoad MyAccountPage');
  }

  actionUpdateProfile()
  {
    // user_id profileUpdate
   
     if ( this.user.fname == undefined || this.user.fname == null || this.user.fname == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your First Name');
    } 
    else if(this.user.lname == undefined || this.user.lname == null || this.user.lname == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Last Name');
    }
   
    else if(this.user.isd == undefined || this.user.isd == null || this.user.isd == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your isd code');
    }
    else if(this.user.mobile == undefined || this.user.mobile == null || this.user.mobile == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Mobile No');
    }
    else
    {
       const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();
       let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
      
       let api_url = "profileUpdate";
       let  auth_token = this.helperService.getAuth(apiname,api_url);
       this.user["version"] = 1;
       this.user["user_id"] = localStorage.getItem('user_id');
       this.user["auth_token"] = auth_token ;

        this.myaccountmervice.updateprofile(this.user).subscribe((resp) => {

          //   // this.navCtrl.push(Myservice);
           loading.dismiss();
          //   // console.log(resp);
             if (resp.profileUpdate.status==1){

              localStorage.setItem('user_id', resp.profileUpdate.details.user_id);
              localStorage.setItem('image', resp.profileUpdate.details.image);
              localStorage.setItem('username', resp.profileUpdate.details.username);
              localStorage.setItem('fname', resp.profileUpdate.details.fname);
              localStorage.setItem('lname', resp.profileUpdate.details.lname);
              localStorage.setItem('email', resp.profileUpdate.details.email);
              localStorage.setItem('isd', resp.profileUpdate.details.isd);
              localStorage.setItem('mobile', resp.profileUpdate.details.mobile);
              localStorage.setItem('created_date', resp.profileUpdate.details.created_date);


              this.user.fname =  localStorage.getItem('fname');
              this.user.lname =  localStorage.getItem('lname');
              this.user.email =  localStorage.getItem('email');
              this.user.mobile = localStorage.getItem('mobile');
              this.user.isd =  localStorage.getItem('isd');
              this.helperService.sendalertmessage('bottom',resp.profileUpdate.message);
                  
             }
    
           else{
             this.helperService.sendalertmessage('bottom',resp.profileUpdate.message);
                   }
                }, (err) => {
            loading.dismiss();
                    this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
           });
    }



  }

  goToChangePassword()
  {
    this.navCtrl.push(ChangepasswordPage);
  }

}
