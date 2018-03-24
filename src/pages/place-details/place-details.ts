import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {
  place;
  index;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public placeService: PlaceService
  ) {
    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
  }

  onDelete() {
    let confirm = this.alertCtrl.create({
      title: 'Don\'t like the Place?',
      message: 'Do you want to delete this place? You will not be able to restore it!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {
            this.deletePlace();
          }
        }
      ]
    });
    confirm.present();
  }

  deletePlace() {
    const loader = this.loadingCtrl.create({
      content: "Deleting Place..."
    });
    loader.present();
    this.placeService.deletePlace(this.index).then(() => {
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: "Place deleted successfully.",
        duration: 1500
      });
      this.placeService.loadPlaces();
      toast.present();
      this.navCtrl.pop();
    }).catch(() => {
      loader.dismiss();
    })
  }

}
