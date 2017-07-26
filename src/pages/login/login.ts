import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
//import { Push, PushToken } from '@ionic/cloud-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    loading: Loading;
  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, private fb: Facebook, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  googleLogin(){
 
        this.googlePlus.login({
          'ClientId': '415715737835-kevn1lcooi1f1q5hdv3m185lql12n1j3.apps.googleusercontent.com"'
        }).then((res) => {
            console.log(res);
            //this.generateToken();
            this.navCtrl.push(HomePage);
        }, (err) => {
            console.log(err);
        });
 
    }

    // generateToken(){
    //     this.push.register().then((t: PushToken) => {
    //     return this.push.saveToken(t);
    //   }).then((t: PushToken) => {
    //     console.log('Token saved:', t.token);
    //   });
 
    //   this.push.rx.notification()
    //   .subscribe((msg) => {
    //     console.log('I received awesome push: ' + msg);
    //   });

    // }

    fbLogin() {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => {
                var abc = res.authResponse.userID;
        this.showLoading();
        this.navCtrl.setRoot(HomePage);
            })
            .catch(e => this.showError('Error logging into Facebook'));
    }

    showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismissAll();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
