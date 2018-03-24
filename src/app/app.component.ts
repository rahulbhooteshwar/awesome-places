import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PlaceService } from '../services/place.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  showSplash = true; // <-- show animation
  rootPage: any = HomePage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private placeService: PlaceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image
      this.placeService.loadPlaces().then(() => {
        setTimeout(() => {
          this.showSplash = false
        }, 1500);
      }).catch(() => {
        this.showSplash = false
      })
    });
  }
}

