/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../service/news.service';
import { GoogleNews } from '../models/googleNews';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '../service/loading.service'; 
import { LoactionService } from '../service/loaction.service';
import { Location } from '../shared/locationMap';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-toogle-news',
  templateUrl: './toogle-news.page.html',
  styleUrls: ['./toogle-news.page.scss'],
})
export class ToogleNewsPage implements OnInit {
  topNews: GoogleNews;
  innerWidth: number;
  innerHeight: number;
  errMess: any;
  viewOption: any;
  subscribe: any;
  currentLocation: any;
  countries = Location;

  // explore news 
  newsCurrentPage: number;
  listNewsPages: any =[];
  totalNewsPages: number;
  options: any = {"page": 2, "limit": 20};

  browserOptions : InAppBrowserOptions = {
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
    private inAppBrowser: InAppBrowser, private loadingService: LoadingService, 
    private loactionService: LoactionService, public navCtrl: NavController ) {
      this.loactionService.currentLocation.subscribe((data)=>{
        this.currentLocation = data;
      })
      this.newsCurrentPage = 1;
      
     }
  
  ngOnInit() {
    this.viewOption = this.route.snapshot.data.viewOption;
    console.log("View option; ", this.viewOption);
    this.getTopNews();
  }

  

  method(url){
    console.log("Method clicked: ",url)
    let target = "_self";
    const browser = this.inAppBrowser.create(url,target,this.browserOptions);
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

  segmentChanged(catagory){
  this.loactionService.currentLocation.next(catagory.detail.value);
  if(this.router.url !=  '/news/TopNews'){
    this.router.navigate(['/news/TopNews']);
  }else{
    this.router.navigate(['/toogle-news']);
  }
}

  // explore news implementation 
  loadData(event) {
      this.getMoreNews();     
      event.target.complete();
  }
 getMoreNews(){
  this.options.page = this.newsCurrentPage+1;
  if(this.totalNewsPages>this.newsCurrentPage){
    this.newsService.getNews(this.options, this.viewOption).subscribe((data)=>{
      this.listNewsPages.push(data);
      this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
      this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
      console.log("scroll data, totalPage: "+this.totalNewsPages);
      console.log("scroll data, currentPage: "+this.newsCurrentPage);
      console.log("scroll data: "+JSON.stringify(this.listNewsPages));
    },err=>{
      console.log('Failed to get all videos');
      this.errMess = "Failed to Process";
      alert("error")
    })
  }
 }

 getTopNews(){
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

}

*/