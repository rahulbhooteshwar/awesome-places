import { Injectable } from '@angular/core';
import { Place } from '../models/place.model';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PlaceService {
  places: Place[] = [];
  constructor(
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
  }

  getPlaces(): Place[] {
    return this.places;
  }

  loadPlaces(): Promise<any> {
    return this.storage.get('places').then((data) => {
      if (data) {
        this.places = data;
      }
    }).catch((error) => {
      this.showToastMessage("Error in getting places from storage!!");
      throw error;
    })
  }

  addPlace(place: Place): Promise<any> {
    const temp = [...this.places];
    temp.push(place);
    // save in storage
    return this.storage.set('places', temp).then((data) => {
      this.places = temp;
    }).catch((error) => {
      this.showToastMessage("Error in adding place to storage!!");
      throw error;
    })
  }

  deletePlace(index: number): Promise<any> {
    const temp = [...this.places];
    temp.splice(index, 1);
    // save in storage
    return this.storage.set('places', temp).then(() => {
      this.places = temp;
    }).catch((error) => {
      this.showToastMessage("Error in removing place from storage!!");
      throw error;
    })
  }

  showToastMessage(message: string) {
    const toast = this.toastCtrl.create({
      duration: 2500,
      message: message
    });

    toast.present();

  }
}
