import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import {ForgotPasswordService}  from './forgotpassword.service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [HelperService,ForgotPasswordService,ApiService]
})
export class ForgotPasswordPage {

  user = {
    'email' :'',
    
}
  constructor(public navCtrl: NavController,public forgotPasswordservice : ForgotPasswordService , public navParams: NavParams,public helperService : HelperService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgotpasswordForm()
  {
    if ( this.user.email == undefined || this.user.email == null || this.user.email == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your email');
    } 
    
    else
     {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();

    // console.log(this.user.email);
     let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
      
     let api_url = "forgotPassword";
     let  auth_token = this.helperService.getAuth(apiname,api_url);
     this.user["version"] = 1;
     this.user["auth_token"] = auth_token ;
      console.log(this.user);
       this.forgotPasswordservice.forgotpassword(this.user).subscribe((resp) => {
         loading.dismiss();
    //     // console.log(resp);
        if (resp.forgotPassword.status==1)
        {
          this.helperService.sendalertmessage('bottom',resp.forgotPassword.message);
          this.navCtrl.push(LoginPage);
         }
        else
        {
           this.helperService.sendalertmessage('bottom',resp.forgotPassword.message);
        }
        }, (err) => {
         loading.dismiss();
         this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
      });
    }
  }
}
