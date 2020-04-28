import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSeervice: AuthenticateService, private menuCtrl : MenuController) { }
  ngOnInit() {
    this.authSeervice.logout();
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }
  doGoogleLogin(){
    this.authSeervice.doGoogleLogin();
  }
  doFbLogin(){
    this.authSeervice.doFbLogin();
  }
}
