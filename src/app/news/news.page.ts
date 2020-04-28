import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../service/news.service';
import { GoogleNews } from '../models/googleNews';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '../service/loading.service'; 
import { NavController } from '@ionic/angular';
import { Catagories } from '../shared/catagories';
import { CatagoryService } from '../service/catagory.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  topNews: GoogleNews;
  errMess: any;
  selectedCatagory: string;
  catagories = Catagories;
  // explore news 
  listNewsPages: any =[];

  newsCurrentPage: number;
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
  location: any;

  constructor(private newsService: NewsService, private router : Router, private route: ActivatedRoute,
    private inAppBrowser: InAppBrowser, private loadingService: LoadingService, 
    private catagoryService: CatagoryService, public navCtrl: NavController ) {
      this.catagoryService.catagory.subscribe((data)=>{
        this.selectedCatagory = data;
      })
      this.newsCurrentPage = 1;
      this.totalNewsPages =2;
     }
  
  ngOnInit() {
    this.location = this.route.snapshot.data.location;
    console.log("View option; ", this.location);
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
    this.catagoryService.catagory.next(catagory.detail.value);
    this.resetAll()
    this.getTopNews();
}

// explore news implementation 
  loadData(event) {
      this.getMoreNews(event);     
  }
 getMoreNews(event){
  this.options.page = this.newsCurrentPage+1;
  if(this.totalNewsPages>=this.newsCurrentPage){
    this.newsService.getNews(this.options, this.location).subscribe((data)=>{
      this.listNewsPages.push(data);
      this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
      this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
      console.log("scroll data, totalPage: "+this.totalNewsPages);
      console.log("scroll data, currentPage: "+this.newsCurrentPage);
      console.log("scroll data: "+JSON.stringify(this.listNewsPages));
      event.target.complete();

    },err=>{
      this.errMess = "Failed to Process";
      event.target.complete();
    })
  }else{
    event.target.complete();
  }
 }

 getTopNews(){
  this.newsService.getTopNews(this.location).subscribe((res)=>{
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
   // alert(JSON.stringify(error));
    this.errMess ="Failed to process";
    }
  })
 }

 resetAll(){
  this.errMess = null;
  this.topNews = null;
  this.listNewsPages = [];
  this.newsCurrentPage = 1;
  this.totalNewsPages =2;
 }

 getPostRelativeTime(postDate): any{
  let now = new Date();
  let post =new Date(postDate);
  var diff = +now.getHours - +post.getHours;
  return diff;
 }

}
