import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { PlaceService } from '../../services/place.service';
import { PlaceDetailsPage } from '../place-details/place-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  placeDetailsPage = PlaceDetailsPage;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public placeService: PlaceService
  ) {

  }

  ionViewDidEnter() {
    //this.loadPlaces();
  }
  loadPlaces(refresher?: any) {
    let loader;
    if (!refresher) {
      loader = this.loadingCtrl.create({
        content: "Loading Places..."
      });
      loader.present();
    }
    this.placeService.loadPlaces().then(() => {
      if (loader) {
        loader.dismiss();
      }
      if (refresher) {
        refresher.complete();
      }
    }).catch(() => {
      if (loader) {
        loader.dismiss();
      }
      if (refresher) {
        refresher.complete();
      }
    })
  }
}
