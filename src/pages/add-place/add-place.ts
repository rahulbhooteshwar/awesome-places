import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Location } from '../../models/location.model';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../models/place.model';
import * as moment from 'moment';

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location;
  error;
  imageSrc;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public geolocation: Geolocation,
    public camera: Camera,
    public placeService: PlaceService
  ) {
  }

  ionViewDidLoad() {
  }

  onOpenMaps() {
    const modal = this.modalCtrl.create(SetLocationPage, { location: this.location });
    modal.present();
    modal.onDidDismiss((data: Location) => {
      if (data) {
        this.location = data;
      }
    });
  }

  onLocateMe() {
    this.geolocation.getCurrentPosition().then((position) => {
      this.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }).catch((error) => {
      this.showErrorAlert("Error in fetching location!");
    });
  }


  showErrorAlert(error) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

  onOpenCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
    });
  }
  onSubmit(f: NgForm) {
    const loader = this.loadingCtrl.create({
      content: "Adding Place..."
    });
    loader.present();
    const place: Place = {
      title: f.value.title,
      description: f.value.description,
      location: this.location,
      imageSrc: this.imageSrc,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    this.placeService.addPlace(place).then(() => {
      this.location = null;
      this.imageSrc = null;
      f.resetForm();
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: "Place Added successfully.",
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
