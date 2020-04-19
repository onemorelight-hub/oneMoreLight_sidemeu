import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Top News',
      url: '/news/TopNews',
      icon: 'home'
    },
    {
      title: 'Business',
      url: '/news/Business',
      icon: 'analytics'
    },
    {
      title: 'Health',
      url: '/news/Health',
      icon: 'medical'
    },
    {
      title: 'Scciencs',
      url: '/news/Science',
      icon: 'funnel'
    },
    {
      title: 'Sports',
      url: '/news/Sports',
      icon: 'football'
    },
    {
      title: 'Technology',
      url: '/news/Technology',
      icon: 'flask'
    },
    {
      title: 'Entertainment',
      url: '/news/Entertainment',
      icon: 'film'
    },
    {
      title: 'Contact',
      url: '/news/Entertainment',
      icon: 'information-circle'
    },

    {
      title: 'Login',
      url: '/login',
      icon: 'information-circle'
    },
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {
    this.initializeApp();
    this.checkActiveFacebookLogin();
    this.checkActiveGoogleLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('news/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  //** Ccheking facebook user is logged in or not */
  checkActiveFacebookLogin(){

    this.platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
  		this.nativeStorage.getItem('facebook_user')
      .then( data => {
        // user is previously logged and we have his data
        // we will let him access the app
        console.log("Facebook user data: ",data)
        this.router.navigate(["/news/TopNews"]);
        this.splashScreen.hide();
      }, err => {
        //we don't have the user data so we will ask him to log in
      	this.router.navigate(["/login"]);
        this.splashScreen.hide();
      });

      this.statusBar.styleDefault();
    });
  }
//** s */

checkActiveGoogleLogin(){
  this.platform.ready().then(() => {
    //Here we will check if the user is already logged in
    //because we don't want to ask users to log in each time they open the app
    this.nativeStorage.getItem('google_user')
    .then( data =>{
      // user is previously logged and we have his data
      // we will let him access the app
      console.log("Google User Data: ",data);
      this.router.navigate(["/user"]);
      this.splashScreen.hide();
    }, error =>{
      this.router.navigate(["/login"]);
      this.splashScreen.hide();
    });
    this.statusBar.styleDefault();
  });
}
}
