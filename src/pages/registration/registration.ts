import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { LoginPage } from '../login/login';
import {RegistrationService} from './registration.service';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
  providers: [HelperService,RegistrationService,ApiService]
})
export class RegistrationPage {

  user = {
    'fname' :'',
    'lname' :'',
    'email' :'',
    'isd'   :'',
    'mobile':'',
    'password':''
}
  constructor(public registrationservice : RegistrationService,public navCtrl: NavController, public navParams: NavParams,public helperService :HelperService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  registrationForm()
  {
    if ( this.user.fname == undefined || this.user.fname == null || this.user.fname == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your First Name');
    } 
    else if(this.user.lname == undefined || this.user.lname == null || this.user.lname == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Last Name');
    }
    else if(this.user.email == undefined || this.user.email == null || this.user.email == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your email');
    }
    else if(  !new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$").test(this.user.email)) 
    {
      this.helperService.sendalertmessage('bottom','please enter proper email ');
    }
    else if(this.user.isd == undefined || this.user.isd == null || this.user.isd == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your isd code');
    }
    else if(this.user.mobile == undefined || this.user.mobile == null || this.user.mobile == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Mobile No');
    }
    else if(this.user.password == undefined || this.user.password == null || this.user.password == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your  password');
    }
    
    else
     {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();

    // console.log(this.user.loginfield);
     // console.log(this.user.password);
     let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
      
     let api_url = "registration";
    let  auth_token = this.helperService.getAuth(apiname,api_url);
    this.user["version"] = 1;
    this.user["auth_token"] = auth_token ;
     this.registrationservice.registrationdata(this.user).subscribe((resp) => {

      //   // this.navCtrl.push(Myservice);
       loading.dismiss();
      //   // console.log(resp);
         if (resp.registration.status==1){
          this.helperService.sendalertmessage('bottom',resp.registration.message);
         
            this.navCtrl.push(LoginPage);
                  
         }

       else{
         this.helperService.sendalertmessage('bottom',resp.registration.message);
               }
            }, (err) => {
        loading.dismiss();
                this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
       });
     }
  }
}
