import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlacefilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-placefilter',
  templateUrl: 'placefilter.html',
})
export class PlacefilterPage {
  
  placeCat:any;
  selectedFilterCategory:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.placeCat = this.navParams.get('placeCatList');
  	this.selectedFilterCategory = [];
  }

  ionViewWillEnter() {
  	console.log(sessionStorage.getItem('placeCat'));
  	console.log(sessionStorage.getItem('selectedFilterCategory'));

  	if(sessionStorage.getItem('placeCat') ==null  &&  sessionStorage.getItem('selectedFilterCategory') ==null){
  		this.addCheckStatusKey();
  	}else{
  		this.placeCat = JSON.parse(sessionStorage.getItem('placeCat'));
  		this.selectedFilterCategory = sessionStorage.getItem('selectedFilterCategory');
  	}
    
  }

  addCheckStatusKey(){
  	for(var i=0;i<this.placeCat.length;i++){
      this.placeCat[i]['checkStatus'] = false;
    }
//
    setTimeout(()=>{
	  console.log(this.placeCat);
	}, 3000);
   
  }


  selectFilter(arrayIndex, id, e:any){
  	// console.log("before "+this.selectedFilterCategory);
   //  console.log("before "+this.placeCat);

    if(e.checked){  
      console.log(this.selectedFilterCategory);   
      console.log(id);      
      this.selectedFilterCategory.push(id);
      this.placeCat[arrayIndex]['checkStatus'] = true;      
    }else{
      const foundAt = this.selectedFilterCategory.indexOf(id);
      this.selectedFilterCategory.splice(foundAt, 1);
      this.placeCat[arrayIndex]['checkStatus'] = false;      
    }
    // console.log(this.selectedFilterCategory);
    // console.log(this.placeCat);
    sessionStorage.setItem('placeCat', JSON.stringify(this.placeCat));
    sessionStorage.setItem('selectedFilterCategory', this.selectedFilterCategory);    
  }

}

