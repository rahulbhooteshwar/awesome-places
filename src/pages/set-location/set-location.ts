import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location.model';

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location = {
    lat: 28.6073485,
    lng: 77.1996194
  };
  marker: Location;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    if (navParams.get('location')) {
      this.location = navParams.get('location');
      this.marker = navParams.get('location');
    }
  }

  ionViewDidLoad() {
  }

  onMapClick($event) {
    this.marker = $event.coords;
  }

  onDone() {
    this.viewCtrl.dismiss(this.marker);
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }

}
