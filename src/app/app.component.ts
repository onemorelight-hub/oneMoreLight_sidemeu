import { Component, OnInit, ViewChild, Optional } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
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
 // navLinksArray = [];// store route links as the user navigates the app
 // currentUrl : any;
  //toggleRoute = true;
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
      this.checkActiveFacebookLogin();
      this.checkActiveGoogleLogin();
      this.checkUserToken();
      // Get social user profile
      this.authenticateService.socialUser.subscribe((data)=>{
        this.userData= data;
      });
      this.platform.backButton.subscribe(() =>{
        this.loadingService.stopLoadin();
        if(this.router.url == "/news/TopNews"){
          navigator["app"].exitApp();
        }else{
          this.router.navigateByUrl("/news/TopNews");
        }
      })
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd ){
          this.activePath = this.router.url;
        } 
      })
  /*
    // for Navigation and Hardware backbutton 
    this.router.events.subscribe(event =>{
      const url = this.router.url //current url
      if (event instanceof NavigationEnd && this.toggleRoute) {
      const isCurrentUrlSaved = this.navLinksArray.find((item) => {return item === url});
      if (!isCurrentUrlSaved) {
        this.navLinksArray.push(url);
      }
      }// end event if stmt
    }) // end subscribe
    this.hardwareBackButton();
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
    this.platform.ready().then(() => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
  		this.nativeStorage.getItem('facebook_user')
      .then( data => {
        // user is previously logged and we have his data
        // we will let him access the app
       // console.log("Facebook user data: ",data)
      //  this.router.navigate(["/news/TopNews"]);
        this.authenticateService.setUserDetails(data);
       // this.splashScreen.hide();
      }, err => {
        //we don't have the user data so we will ask him to log in
      //	this.router.navigate(["/login"]);
      //  this.splashScreen.hide();
      });
     // this.statusBar.styleDefault();
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
     // alert("Google data found"+JSON.stringify(data))
     // this.router.navigate(["/news/TopNews"]);
     this.authenticateService.setUserDetails(data);
     // this.splashScreen.hide();
    }, error =>{
     // this.router.navigate(["/news/TopNews"]);
     // this.splashScreen.hide();
    });
   // this.statusBar.styleDefault();
  });
}

checkUserToken(){
  this.platform.ready().then(() => {
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('oneToken')
      .then( data =>{
        // user is previously logged and we have his data
        // we will let him access the app
      this.authenticateService.setToken(data);
      this.router.navigate(["/news/TopNews"]);
        this.splashScreen.hide();
      }, error =>{
     //   alert(error);
        this.router.navigate(["/login"]);
        this.splashScreen.hide();
      });
    // this.statusBar.styleDefault();
    });
}

/*
// Hardware navigation
hardwareBackButton(){
  this.platform.backButton.subscribe(() =>{
  if (this.navLinksArray.length > 1){
    this.navLinksArray.pop();
    var index = this.navLinksArray.length - 1;
    var url = this.navLinksArray[index];
    this.setRoute(false);
    this.router.navigate([url]);
  }else if(this.navLinksArray.length == 1){
    this.setRoute(false);
    this.navLinksArray.pop();
    this.router.navigateByUrl("/news/TopNews");
  }else{
    if(window.confirm("do you want to exit app")){
      navigator["app"].exitApp();
    }
  }
  }) // end subscription
  } // end back button fn
  setRoute(value){
    this.toggleRoute = value;
  }
*/
}
