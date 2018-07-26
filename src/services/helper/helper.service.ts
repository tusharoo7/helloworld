import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class HelperService {


  constructor(
    public toastCtrl: ToastController
  ) { }

  sendalertmessage(position: string,message: string)
  {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }  

  getAuth(apiname,api_url)
  {
    
    let enc_key = Md5.hashStr(apiname+api_url);
    return enc_key;
  }

}
