import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,Events } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { SignUpService } from './signup.service';
import { ApiService } from '../../services/api/api.service';
import { DonateThisChurchPage} from '../donate-this-church/donate-this-church';
import{RegistrationPage} from '../registration/registration';
import{ForgotPasswordPage} from '../forgot-password/forgot-password';
import{SearchWorshipPage} from '../search-worship/search-worship';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [HelperService,SignUpService,ApiService]
})
export class LoginPage {
  user = {
      'loginfield' :'',
      'password':''
  }
  loginfield :any; 
  constructor(public events: Events,public navCtrl: NavController, public signupService :SignUpService , public navParams: NavParams,public helperService: HelperService,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {

    if ( this.user.loginfield == undefined || this.user.loginfield == null || this.user.loginfield == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your username');
    } 
    else if (this.user.password == undefined || this.user.password == null || this.user.password == '' )
     {
        this.helperService.sendalertmessage('bottom','please  enter your password');
     }
    else
     {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();

     console.log(this.user.loginfield);
      console.log(this.user.password);
      let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
      
      let api_url = "login";
     let  auth_token = this.helperService.getAuth(apiname,api_url);
      let loginparam = {"auth_token" : auth_token , "version" :1 ,"email" : this.user.loginfield ,"password" :this.user.password , "device_token" : "111", "device_type" : "w" }
      //console.log(loginparam);
      this.signupService.signup(loginparam).subscribe((resp) => {

        // this.navCtrl.push(Myservice);
        loading.dismiss();
        // console.log(resp.Response["_body"]);
        if (resp.login.status==1){
          localStorage.setItem('isLoggedIn', "1");

          localStorage.setItem('user_id', resp.login.details.user_id);
          localStorage.setItem('image', resp.login.details.image);
          localStorage.setItem('username', resp.login.details.username);
          localStorage.setItem('fname', resp.login.details.fname);
          localStorage.setItem('lname', resp.login.details.lname);
          localStorage.setItem('email', resp.login.details.email);
          localStorage.setItem('isd', resp.login.details.isd);
          localStorage.setItem('mobile', resp.login.details.mobile);
          localStorage.setItem('created_date', resp.login.details.created_date);
          this.helperService.sendalertmessage('bottom',resp.login.message);

          // create event against this 
          this.events.publish('loggedinsucessfull', localStorage.getItem('isLoggedIn'), Date.now());
          this.navCtrl.setRoot(SearchWorshipPage);
       
        }
        else if(resp.login.status==0)
        {
          this.helperService.sendalertmessage('bottom',resp.message);
        }
           }, (err) => {
        loading.dismiss();
       this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
      });
     }
  }


  forgot_password()
  {
    
    this.navCtrl.push(ForgotPasswordPage);
  }
  registration()
  {
    this.navCtrl.push(RegistrationPage);
  }

  
}
