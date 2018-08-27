import {Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

declare var google;
/**
 * Generated class for the AutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  action :any;
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, private zone: NgZone) {
    this.action = navParams.get('action');
    this.autocompleteItems = [];
    this.autocomplete = {
      query:''
    };
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
 
  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query}, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            console.log(status);
            return;
        }
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  close(){
    this.viewCtrl.dismiss();
} 

}
