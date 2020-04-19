import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { NewsService } from '../service/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expl-news',
  templateUrl: './expl-news.page.html',
  styleUrls: ['./expl-news.page.scss'],
})
export class ExplNewsPage implements OnInit {


  @ViewChild('content', { static: false }) private content: any;

  newsCurrentPage: number;
  listNewsPages: any =[];
  totalNewsPages: number;
  options: any = {"page": 1, "limit": 10};
  errMess: any;
  imageWidth: number;
  viewOption: any;

  constructor(private newsService: NewsService, private route : ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.viewOption = this.route.snapshot.data.viewOption;
    console.log("View option; ", this.viewOption);

    this.newsService.getNews(this.options, this.viewOption).subscribe((data)=>{
      this.listNewsPages.push(data);
      this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
      this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
      console.log('init home News: '+JSON.stringify(data));
      console.log("scroll data, totalPage: "+this.totalNewsPages);
      console.log("scroll data, currentPage: "+this.newsCurrentPage);
      console.log("scroll data: "+JSON.stringify(this.listNewsPages));
    },err=>{
      console.log('Failed to get News: error->'+err);
      this.errMess = "Failed to Process";
    })
// testing cod
  }

  async logScrolling($event){
    if($event.target.localName != "ion-content") {
      // not sure if this is required, just playing it safe
      return;
    }
    const scrollElement = await $event.target.getScrollElement();
  //  console.log({scrollElement});

    // minus clientHeight because trigger is scrollTop
    // otherwise you hit the bottom of the page before 
    // the top screen can get to 80% total document height
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
   // console.log({scrollHeight});
    const currentScrollDepth = $event.detail.scrollTop;
   // console.log({currentScrollDepth});
    const targetPercent = 95;
    let triggerDepth = ((scrollHeight / 100) * targetPercent);
  //  console.log({triggerDepth});

    if(currentScrollDepth > triggerDepth) {
      console.log(`Scrolled to ${targetPercent}%`);
      // this ensures that the event only triggers once
      // do your analytics tracking here

      this.options.page = this.newsCurrentPage+1;
      this.newsService.getNews(this.options, this.viewOption).subscribe((data)=>{
        this.listNewsPages.push(data);
        this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
        this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
        console.log('init home News: '+JSON.stringify(data));
        console.log("scroll data, totalPage: "+this.totalNewsPages);
        console.log("scroll data, currentPage: "+this.newsCurrentPage);
        console.log("scroll data: "+JSON.stringify(this.listNewsPages));
      },err=>{
        console.log('Failed to get all videos');
        this.errMess = "Failed to Process";
      })
    }
  }

}
