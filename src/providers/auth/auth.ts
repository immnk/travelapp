import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { APP_CONFIG_TOKEN, AppConfig } from '../utils-service/config-service';
import { LoggerServiceProvider } from '../logger-service/logger-service';

@Injectable()
export class AuthProvider {

  private config: AppConfig;
  constructor(private _af: FirebaseApp, private http: Http, @Inject(APP_CONFIG_TOKEN) config: AppConfig,
    private _logger: LoggerServiceProvider) {
    this.config = config;
  }

  loginUser(email: string, password: string): Promise<any> {
    return this._af.auth().signInWithEmailAndPassword(email, password);
  }

  customLogin(username: string, password: string): any {

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.config.authEndPoint, { "username": username })
        .subscribe((response) => {
          this._logger.log("AuthProvider: customLogin - response", response);
          if (response.status == 200 && response) {
            let responseBody = response["_body"];
            let token;
            if (responseBody) {
              token = JSON.parse(responseBody)["token"];
              this._logger.log("token: ", token);
              resolve(firebase.auth().signInWithCustomToken(token));
            } else {
              reject("Couldnt get the response");
            }
          } else {
            reject("Custom auth server is not working");
          }
        });
    });

    return promise;
  }

  signupUser(email: string, password: string): Promise<any> {
    return this._af.auth().createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this._af.database().ref('/userProfile').child(newUser.uid)
          .set({ email: email });
      });
  }

  resetPassword(email: string): Promise<void> {
    return this._af.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this._af.auth().signOut();
  }

  isAuthenticated() {
    var user = this._af.auth().currentUser;

    if (user) {
      return user;
    } else {
      return false;
    }
  }
}
