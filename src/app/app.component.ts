import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticateService } from './service/authenticate.service'
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
   
    {
      title: 'India',
      url: '/news/India',
      icon: 'flag'

    },
    {
      title: 'United State',
      url: '/news/USA',
      icon: 'flag'
    },
    {
      title: 'United Kingdom',
      url: '/news/UK',
      icon: 'flag'
    },
    {
      title: 'Australia',
      url: '/news/Australia',
      icon: 'flag'
    },
    {
      title: 'Canada',
      url: '/news/Canada',
      icon: 'flag'
    },
    {
      title: 'Ireland',
      url: '/news/Ireland',
      icon: 'flag'
    },
    {
      title: 'Malaysia',
      url: '/news/Malaysia',
      icon: 'flag'
    },
    {
      title: 'New Zealand',
      url: '/news/NewZealand',
      icon: 'flag'
    },
    {
      title: 'Saudi Arabia',
      url: '/news/SaudiArabia',
      icon: 'flag'
    },
    {
      title: 'South Africa',
      url: '/news/SouthAfrica',
      icon: 'flag'
    },
    {
      title: 'Contact',
      url: '/contact',
      icon: 'information-circle'
    },

    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    },

  
   
  ];
  //other members
  userData: any;
  activePath = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
    private authenticateService: AuthenticateService,
    private loadingService: LoadingService,
  ) {
      this.initializeApp();
      // Get social user profile
      this.authenticateService.socialUser.subscribe((data)=>{
        this.userData= data;
      });
      this.platform.backButton.subscribe(() =>{
        this.loadingService.stopLoadin();
        if(this.router.url == "/news/India"){
          navigator["app"].exitApp();
        }else{
          this.router.navigateByUrl("/news/India");
        }
      })
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd ){
          this.activePath = this.router.url;
        } 
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkActiveFacebookLogin();
      this.checkActiveGoogleLogin();
      this.checkUserToken();
      this.statusBar.styleDefault();
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#ffffff');
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
  		this.nativeStorage.getItem('facebook_user').then( data => {
        this.authenticateService.setUserDetails(data);
      }, err => {
      });
  }
//** s */

checkActiveGoogleLogin(){
    this.nativeStorage.getItem('google_user')
    .then( data =>{
     this.authenticateService.setUserDetails(data);
    }, error =>{
    });
}

checkUserToken(){
      this.nativeStorage.getItem('oneToken').then( data =>{
      this.authenticateService.setToken(data);
      this.router.navigate(["/news/India"]);
      }, error =>{
     //   alert(error);
        this.router.navigate(["/login"]);
        this.splashScreen.hide();
      });
  } 
}
