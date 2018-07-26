import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class StorageService {
  //private SETTINGS_KEY: string = '_settings';

  //settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(private storage: Storage)
  { 
    
  }



  // load() {
  //   return this.storage.get(this.SETTINGS_KEY).then((value) => {
  //     if (value) {
  //       this.settings = value;
  //       return this._mergeDefaults(this._defaults);
  //     } else {
  //       return this.setAll(this._defaults).then((val) => {
  //         this.settings = val;
  //       })
  //     }
  //   });
  // }

  // _mergeDefaults(defaults: any) {
  //   for (let k in defaults) {
  //     if (!(k in this.settings)) {
  //       this.settings[k] = defaults[k];
  //     }
  //   }
  //   return this.setAll(this.settings);
  // }

  // merge(settings: any) {
  //   for (let k in settings) {
  //     this.settings[k] = settings[k];
  //   }
  //   return this.save();
  // }

  setValue(key: string, value: any) {
    //this.settings[key] = value;
     this.storage.set(key, value);
  }

  // setAll(value: any) {
  //   return this.storage.set(this.SETTINGS_KEY, value);
  // }

  getValue(key: string) {
     return this.storage.get(key)
      .then(value => {
      //  console.log('val',value)
        return value;
      });
  }


  removeAll() {
    return this.storage.clear()
      .then(value => {
        //  console.log('val',value)
        return value;
      });
  }

  removeOne(key: string) {
    
    return this.storage.remove(key)
      .then(value => {
        //  console.log('val',value)
        return value;
      })
      .catch(err =>
        {
        return err;
      });
  }

  //  save() {
 
  //    return this.setAll(this.settings);
  // }



  // get allSettings() {
  //   return this.settings;
  // }
}







































// import { Injectable } from '@angular/core';
// import { Constants } from "../constants";

// const DEFAULT_STORAGE = Constants.STORAGE_TYPE;
// @Injectable()
// export class StorageService {
//   storageType: string;

//   constructor() { }

//   save(key: string, data: string, storageType:any = "not_set"): void {
//     let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
//     storage_type.setItem(key, data);
//   }

//   saveArray(key: string, data: any, storageType: any = "not_set"): void {
//     let storage_type = storageType === "not_set" ? DEFAULT_STORAGE : storageType;
    
//     storage_type.setItem(key, data);
//   }
  
//   fetch(key: string, storageType:any = "not_set"): string {
//     let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
//     let value: string;
//     try{
//       value = storage_type.getItem(key);
//     }
//     catch(error){
//       value = "";
//     }
//     return value;
//   }

//   eraseSpecific(key: string, storageType:any = "not_set"): void {
//     let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
//     storage_type.removeItem(key);
//   }

//   eraseAll(storageType:any = "not_set"): void {
//     let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
//     storage_type.clear();
//   }

// }
