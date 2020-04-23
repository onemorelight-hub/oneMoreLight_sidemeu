import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../service/news.service';
import { GoogleNews } from '../models/googleNews';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular'
import { LoadingService } from '../service/loading.service'; 

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  topNews: GoogleNews;
  innerWidth: number;
  innerHeight: number;
  errMess: any;
  viewOption: any;
  subscribe: any;

  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'no',
    clearsessioncache : 'no',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};



  constructor(private newsService: NewsService, private router : Router, private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser, private platform: Platform, 
    private loadingService: LoadingService) { 
     /* 
      this.subscribe = this.platform.backButton.subscribeWithPriority(666666,()=>{
        if(this.constructor.name == "NewsPage"){
          if(window.confirm("do you want to exit app")){
            navigator["app"].exitApp();
          }
        }
      })
      */
      
      
    }

  ngOnInit() {
    this.viewOption = this.route.snapshot.data.viewOption;
    console.log("View option; ", this.viewOption);

    this.newsService.getTopNews(this.viewOption).subscribe((res)=>{
      console.log('top News: '+JSON.stringify(res));
      console.log(res.status)
      this.topNews=res;
    },error=>{
      console.log(error.status)
      console.log(error)
      if(error.status == 401){
        console.log("UNauthorised: ", window.location.pathname);
        this.router.navigate([window.location.pathname])
      }
      if(error.status == 202){
        this.errMess =error.error.text;
      }else{
      console.log('error news: '+JSON.stringify(error))
      this.errMess ="Failed to process";
      }
    })
  }

  onMoreNews(){
    console.log("more news: ",this.viewOption)
    if(this.viewOption=="Top News"){
      var path = "expl-"+"News";
    }else{
      var path = "expl-"+this.viewOption;
    }
    console.log("Path: ",path);
    this.router.navigate([path]);
  }

  method(url){
    console.log("Method clicked: ",url)
    let target = "_self";
    const browser = this.inAppBrowser.create(url,target,this.options);
    this.loadingService.showLoading();     
    browser.on('loadstart').subscribe((eve) => {
      this.loadingService.showLoading();     
    }, err => {
      this.loadingService.stopLoadin();
    })
    
    browser.on('loadstop').subscribe(()=>{
      this.loadingService.stopLoadin();
    }, err =>{
      this.loadingService.stopLoadin();
    })
    
    browser.on('loaderror').subscribe(()=>{
      this.loadingService.stopLoadin();
    }, err =>{
      this.loadingService.stopLoadin();
    })
    
    browser.on('exit').subscribe(()=>{
      this.loadingService.stopLoadin();
    }, err =>{
      this.loadingService.stopLoadin();
    })
    
  }
}
