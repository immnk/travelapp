import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Loading,
  LoadingController, AlertController
} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { LoggerServiceProvider } from '../../providers/logger-service/logger-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  email: AbstractControl;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private form: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, private _logger: LoggerServiceProvider) {
    this.initializeForm();
  }

  initializeForm() {
    /* Login validation using Form Builder api */
    this.signupForm = this.form.group({
      'username': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.email = this.signupForm.controls['email']
  }

  signupUser() {
    if (!this.signupForm.valid) {
      this._logger.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email,
        this.signupForm.value.password)
        .then(() => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot("HomePage");
          });
        }, (error) => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: "cancel"
                }
              ]
            });
            alert.present();
          });
        });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
