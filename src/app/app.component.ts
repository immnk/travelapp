import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';

import { LoggerServiceProvider } from '../providers/logger-service/logger-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _af: FirebaseApp, private _logger: LoggerServiceProvider) {
    platform.ready().then(() => {
      if (platform.is("cordova")) {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this._logger.log("App getting to initialize");
    const unsubscribe = this._af.auth().onAuthStateChanged((user) => {
      this._logger.log(user);
      if (!user) {
        this.rootPage = 'LandingPage';
        unsubscribe();
      } else {
        this.rootPage = "HomePage";
        unsubscribe();
      }
    });
  }
}
