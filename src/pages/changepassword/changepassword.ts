import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Myaccount } from '../my-account/myaccount.service'
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
  providers: [HelperService,ApiService,Myaccount]
})
export class ChangepasswordPage {  


  user = {
          current_password : '',
           new_password : '',
           confirm_password : ''
        }
  
  constructor(public myaccountmervice : Myaccount , public helperService : HelperService, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {    
  }

  ionViewDidLoad() {

 console.log('ionViewDidLoad Changepassword');
}
/* Function name: actionChangePassword()
Description: This function is to fire change password
========================== start ================================ */
  actionChangePassword(){    


    if ( this.user.current_password == undefined || this.user.current_password == null || this.user.current_password == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Current Password');
    } 
    else if(this.user.new_password == undefined || this.user.new_password == null || this.user.new_password == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your New Password');
    }
   
    else if(this.user.confirm_password == undefined || this.user.confirm_password == null || this.user.confirm_password == '' )
    {
      this.helperService.sendalertmessage('bottom','please enter your Confirm Password');
    }
    else if(this.user.new_password != this.user.confirm_password  )
    {
      this.helperService.sendalertmessage('bottom','New Password & Confirm Password does not match ');
    }
    else
    {
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
       });
       loading.present();
       let apiname = "base64:/76e6C2AzbbxmBYuVMmtjBTDwNWXa/vrHvtTIbzVkck=";
      
       let api_url = "changePassword";
       let  auth_token = this.helperService.getAuth(apiname,api_url);
       this.user["version"] = 1;
       this.user["user_id"] = localStorage.getItem('user_id');
       this.user["auth_token"] = auth_token ;

       this.myaccountmervice.changepassword(this.user).subscribe((resp) => {

        //   // this.navCtrl.push(Myservice);
         loading.dismiss();
        //   // console.log(resp);
           if (resp.changePassword.status==1){

            this.helperService.sendalertmessage('bottom',resp.changePassword.message);
                
           }
  
         else{
           this.helperService.sendalertmessage('bottom',resp.changePassword.message);
                 }
              }, (err) => {
          loading.dismiss();
                  this.helperService.sendalertmessage('bottom',"oops..! internal error occurred!");
         });
    }
  }
/*============== actionChangePassword() end ===================*/

}
