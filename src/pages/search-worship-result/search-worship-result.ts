import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { PlacelistmapPage } from '../placelistmap/placelistmap';
import { PlacefilterPage } from '../placefilter/placefilter';

/**
 * Generated class for the SearchWorshipResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-search-worship-result',
  templateUrl: 'search-worship-result.html',
})
export class SearchWorshipResultPage {
  searchResultList : any ;
  dataSet: Array<{catName:any, name: any, image: any, address: any, latitude: any, longitude: any, phone: any, website: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.dataSet = [
      { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5915141', longitude: '88.3977665',phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.597383', longitude: '88.419259', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5855474', longitude: '88.4192279', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.575223', longitude: '88.431694', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.5685979', longitude: '88.4308607', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5686855', longitude: '88.4294103', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5735314', longitude: '88.4309249', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Church', name: 'St. Paul\'s Cathedral', image: '', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Mosque', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Buddhist Monastery', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Church', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
      { catName: 'Hindu Temple', name: 'St. Paul\'s Cathedral', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/St_Pauls_Cathedral_from_West_adj.JPG/280px-St_Pauls_Cathedral_from_West_adj.JPG', address: 'Kolkata, West Bengal 700071', latitude: '22.5867', longitude: '88.4171', phone: '10000000000', website: 'http://www.matrixnmedia.com/' },
    ];
    this.searchResultList = this.navParams.get('searchResultList');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWorshipResultPage');
  }

  getpropertydetails(index)
  {
    let jsonData =  JSON.stringify(this.searchResultList[index]);
   // console.log(jsonData);
            this.navCtrl.push(ItemDetailsPage ,{clickedData : jsonData});
  }
 
  
  // goToIndividualPlace(index){
  //   let jsonData =  JSON.stringify(this.dataSet[index]);
  //   this.navCtrl.push(IndividualplacePage, {clickedData : jsonData});
  // }

  goToPlaceListMapPage(){
    this.navCtrl.push(PlacelistmapPage,{
      placeData: this.dataSet
    });
  }

  goToFilterPage(){
    this.navCtrl.push(PlacefilterPage,{
      placeCatList: this.navParams.get('placeCatList')
    });
  }
}
