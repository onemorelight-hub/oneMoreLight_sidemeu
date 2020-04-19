import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { apiGatewayUrl } from '../shared/baseUrl' 
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient : HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }
  data: any;
  getTopNews(viewOption): Observable<any>{
    var url = apiGatewayUrl+ '/news/topnews';
    console.log("getTopNews--> ", viewOption)
    console.log(url);

    switch(viewOption){
      case "News": 
      var url = apiGatewayUrl+ '/in/topnews';
      break;
      case "Business": 
      var url = apiGatewayUrl+ '/in/businessNews';
      break;
      case "Health": 
      var url = apiGatewayUrl+ '/in/healthNews';
      break;
      case "Sports": 
      var url = apiGatewayUrl+ '/in/sportsNews';
      break;
      case "Science": 
      var url = apiGatewayUrl+ '/in/scienceNews';
      break;
      case "Technology": 
      var url = apiGatewayUrl+ '/in/technologyNews';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl+ '/in/entertainmentNews';
      break;
    }
    return this.httpClient.get(url).pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  getNews(options, viewOption): Observable<any>{ 
    switch(viewOption){
      case "Explore Top News": 
      var url = apiGatewayUrl + '/in/expl-top-news';
      break;
      case "Explore Business News": 
      var url = apiGatewayUrl + '/in/expl-business-news';
      break;
      case "Explore Health News": 
      var url = apiGatewayUrl + '/in/expl-health-news';
      break;
      case "Explore Sports News": 
      var url = apiGatewayUrl + '/in/expl-sports-news';
      break;
      case "Explore Science News": 
      var url = apiGatewayUrl + '/in/expl-science-news';
      break;
      case "Explore Technology News": 
      var url = apiGatewayUrl + '/in/expl-technology-news';
      break;
      case "Explore Entertainment News": 
      var url = apiGatewayUrl + '/in/expl-entertainment-news';
      break;
    }
    console.log("getNews--> ", viewOption)
    console.log(url);
    console.log('Checking the options: '+JSON.stringify(options));
    return this.httpClient.post(url,options).pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }
}
